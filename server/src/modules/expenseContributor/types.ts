import { z } from "zod";
import { ExpenseContributorStatus } from "../bills/types";
import { ApiResponse } from "../types";

export type ExpenseContributor = {
	id: string;
	user_id: string;
	name: string;
	expense_id: string;
	approval_status: ExpenseContributorStatus;
};

// requests
export const addContributorToExpenseSchema = z.object({
	name: z.string().optional(),
	userId: z.string().optional(),
	expenseId: z.string(),
});

export type AddContributorToExpenseRequest = z.infer<
	typeof addContributorToExpenseSchema
>;

// responses
export interface AddContributorToExpenseResponse extends ApiResponse<ExpenseContributor> {}
export interface GetExpenseContributorsByExpenseIdResponse
	extends ApiResponse<
		{
			id: string;
			username: string;
			name: string;
			approval_status: ExpenseContributorStatus;
		}[]
	> {}
