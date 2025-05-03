import { uuidv7 } from "uuidv7";
import { SQL } from "../../lib/postgres";
import { ExpenseContributorStatus } from "../bills/types";
import { Expense } from "./types";

export async function findExpensesByUserId(userId: string) {
	return await SQL<
		{
			id: string;
			title: string;
			total_completed: number;
			total_bills: number;
			total_contributor: number;
		}[]
	>`
    select e.id, e.title, count(DISTINCT bb.id) as total_completed, count(DISTINCT b.id) as total_bills, count(DISTINCT e.id) as total_contributor
    from expenses e
    left join bills b on b.expense_id = e.id
    left join expense_contributor as ec on ec.expense_id = e.id
    left join bills as bb on bb.expense_id = e.id and bb.status = 2
    where e.deleted = FALSE and ${userId} in (select ecc.user_id from expense_contributor ecc where ecc.expense_id = e.id)
    group by e.id;
  `;
}

export async function isUserOwnerOfExpense(expenseId: string, userId: string) {
	const data = await SQL<Expense[]>`
    SELECT id
    FROM expenses
    WHERE id = ${expenseId} AND owner = ${userId} AND deleted = false
  `;
	return data.length > 0;
}

export async function createExpense(expense: Expense) {
	return await SQL.begin(async (sql) => {
		const contributerId = uuidv7();
		expense = (
			await sql<Expense[]>`
      INSERT INTO expenses (id, title, description, owner)
      VALUES (${expense.id}, ${expense.title}, ${expense.description}, ${expense.owner})
      RETURNING id, title, description, owner, created_at
    `
		)[0];
		await sql`
      INSERT INTO expense_contributor (id, user_id, expense_id, approval_status)
      VALUES (${contributerId}, ${expense.owner}, ${expense.id}, ${ExpenseContributorStatus.APPROVED})
      `;
		return expense;
	});
}

export async function updateExpense(
	expenseId: string,
	userId: string,
	expense: Partial<Expense>
) {
	return (
		await SQL<Expense[]>`
    UPDATE expenses 
    SET 
      title = ${expense.title}, 
      description = ${expense.description}
    WHERE id = ${expenseId} AND owner = ${userId} AND deleted = false
    RETURNING id, title, description, owner, created_at
  `
	)[0];
}

export async function findExpenseById(expenseId: string, userId: string) {
	return (
		await SQL<Expense[]>`
    SELECT id, title, description, owner, created_at
    FROM expenses
    WHERE id = ${expenseId} AND owner = ${userId} AND deleted = false
  `
	)[0];
}

export async function deleteExpense(expenseId: string, userId: string) {
	return (
		await SQL<Expense[]>`
    UPDATE expenses 
    SET deleted = true
    WHERE id = ${expenseId} AND owner = ${userId} AND deleted = false
    RETURNING id, title, description, owner, created_at
  `
	)[0];
}

export async function hasContributorAccessToExpense(
	expenseId: string,
	contributorId: string
) {
	const data = await SQL<Expense[]>`
  select id from expense_contributor
  where expense_id = ${expenseId} and id = ${contributorId} and approval_status = ${ExpenseContributorStatus.APPROVED}
  `;
	return data.length > 0;
}

export async function hasUserAccessToExpense(
	expenseId: string,
	userId: string
) {
	const data = await SQL<Expense[]>`
  select id from expense_contributor
  where expense_id = ${expenseId} and user_id = ${userId} and approval_status = ${ExpenseContributorStatus.APPROVED}
  `;
	return data.length > 0;
}
