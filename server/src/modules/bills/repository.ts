import { SQL } from "../../lib/postgres";
import { Bill, ExpenseContributorStatus } from "./types";

export async function findBillById(billId: string): Promise<Bill> {
	return (await SQL<Bill[]>`select * from bills where id = ${billId}`)[0];
}

export async function findBillsByExpenseId(expenseId: string): Promise<Bill[]> {
	return await SQL<
		Bill[]
	>`select id, name, category, total_amount, status, currency from bills where expense_id = ${expenseId} and deleted = false`;
}

export async function userHasPermissionToBill(
	userId: string,
	billId: string
): Promise<boolean> {
	const data = await SQL<Bill[]>`
		select b.id from bills b
		left join expense_contributor ec on 
		ec.id = b.expense_id and ec.approval_status = ${ExpenseContributorStatus.APPROVED} and ec.user_id = ${userId}
		where b.id = ${billId} and deleted = false
	`;
	return data.length > 0 && data[0].id === billId;
}

export async function createBill(bill: Bill): Promise<string> {
	const data = await SQL<Bill[]>`
		insert into bills (id, name, description, category, attachment_url, total_amount, paid_by, paid_date, currency, expense_id, status, created_at)
		values (${bill.id}, ${bill.name}, ${bill.description}, ${bill.category}, ${bill.attachment_url}, ${bill.total_amount}, ${bill.paid_by}, ${bill.paid_date}, ${bill.currency}, ${bill.expense_id}, ${bill.status}, ${bill.created_at})
		returning id
	`;
	return data[0].id;
}

export async function updateBill(bill: Bill): Promise<string | null> {
	const data = await SQL<Bill[]>`
		update bills
		set name = ${bill.name}, description = ${bill.description}, category = ${bill.category}, attachment_url = ${bill.attachment_url}, total_amount = ${bill.total_amount}, paid_by = ${bill.paid_by}, paid_date = ${bill.paid_date}, status = ${bill.status}
		where id = ${bill.id} and deleted = false
		returning id
	`;
	return data.length > 0 ? data[0].id : null;
}

export async function deleteBill(billId: string): Promise<string | null> {
	const data = await SQL<Bill[]>`
		update bills
		set deleted = true
		where id = ${billId} and deleted = false
		returning id
	`;
	return data.length > 0 ? data[0].id : null;
}
