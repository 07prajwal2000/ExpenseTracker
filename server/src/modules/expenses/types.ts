import { z } from "zod";
import { ApiResponse } from "../types";

export interface Expense {
	id: string; // uuidv7
	title: string;
	description: string;
	owner: string; // uuidv7
	created_at: Date;
}

// schema
export const createExpenseSchema = z.object({
	title: z.string().min(2).max(100),
	description: z.string().max(512),
});
export const updateExpenseSchema = z.object({
	title: z.string().min(2),
	description: z.string().min(0),
});

// Requests
export type CreateExpenseRequest = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseRequest = z.infer<typeof updateExpenseSchema>;

// Responses
export interface GetAllExpensesResponse
	extends ApiResponse<
		{
			id: string;
			title: string;
			total_completed: number;
			total_bills: number;
			total_contributor: number;
		}[]
	> {}
export interface CreateExpenseResponse extends ApiResponse<Expense> {}
export interface UpdateExpenseResponse extends ApiResponse<Expense> {}
export interface GetExpenseByIdResponse extends ApiResponse<Expense> {}
export interface DeleteExpenseResponse extends ApiResponse<Expense> {}
