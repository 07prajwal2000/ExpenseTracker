import { SQL } from "../../lib/postgres";
import { ExpenseContributorStatus } from "../bills/types";
import { ExpenseContributor } from "./types";

export async function getContributorsForExpense(expenseId: string) {
	return await SQL<
		{
			id: string;
			username: string;
			name: string;
			approval_status: ExpenseContributorStatus;
		}[]
	>`
    SELECT ec.id as id, u.name as username, ec.name as name, ec.approval_status as approval_status FROM expense_contributor ec 
    left join users u on u.id = ec.user_id and u.deleted = false
    where ec.expense_id = ${expenseId}
  `;
}

export async function createContributor(contributor: ExpenseContributor) {
	return (await SQL<ExpenseContributor[]>`
    INSERT INTO expense_contributor (id, user_id, name, expense_id, approval_status)
    VALUES (${contributor.id}, ${contributor.user_id}, ${contributor.name}, ${contributor.expense_id}, ${contributor.approval_status})
    returning *
  `)[0];
}