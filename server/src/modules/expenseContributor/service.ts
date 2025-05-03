import { uuidv7 } from "uuidv7";
import { hasUserAccessToExpense } from "../expenses/repository";
import { createContributor, getContributorsForExpense } from "./repository";
import {
	AddContributorToExpenseRequest,
	AddContributorToExpenseResponse,
	GetExpenseContributorsByExpenseIdResponse,
} from "./types";
import { ExpenseContributorStatus } from "../bills/types";

export async function getContributorsFromExpenseId(
	expenseId: string,
	userId: string
): Promise<GetExpenseContributorsByExpenseIdResponse> {
	const hasPermission = hasUserAccessToExpense(expenseId, userId);
	if (!hasPermission) {
		return {
			code: 403,
			message: "You do not have permission to access this expense",
		};
	}
	const data = await getContributorsForExpense(expenseId);
	return {
		code: 200,
		data,
	};
}

export async function addContributorToExpense(
	userId: string,
	data: AddContributorToExpenseRequest
): Promise<AddContributorToExpenseResponse> {
	const hasPermission = hasUserAccessToExpense(data.expenseId, userId);
	if (!hasPermission) {
		return {
			code: 403,
			message: "You do not have permission to access this expense",
		};
	}
	const contributor = await createContributor({
		id: uuidv7(),
		user_id: data.userId ?? "",
		name: data.name ?? "",
		expense_id: data.expenseId,
		approval_status:
			(data.name?.length ?? 0) > 0
				? ExpenseContributorStatus.APPROVED
				: ExpenseContributorStatus.PENDING,
	});
	return {
		code: 200,
		data: contributor,
	};
}
