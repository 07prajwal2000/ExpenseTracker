import { z } from "zod";
import { ApiResponse } from "../types";
import { currencyCodeList } from "../../constants/currency";

export type Bill = {
	id: string; // uuidv7
	name: string;
	description: string;
	category: string;
	attachment_url: string;
	total_amount: number;
	paid_by: string; // uuidv7
	paid_date: Date;
	currency: string;
	expense_id: string; // uuidv7
	status: BillStatus;
	created_at: Date;
  deleted: boolean;
};

export enum BillStatus {
	UN_PAID = 1,
	PAID = 2,
}

export enum ExpenseContributorStatus {
	PENDING = 0,
	APPROVED = 1,
	REJECTED = 2,
}

// requests
export const createBillSchema = z.object({
	name: z.string().min(1),
	description: z.string().max(1024),
	category: z.string().max(50),
	attachmentUrl: z
		.string()
		.refine((x) => z.string().url().optional().safeParse(x).success),
	totalAmount: z.number(),
	paidBy: z.string(),
	paidDate: z
		.string()
		.refine((x) =>
			Boolean(x) ? z.string().url().optional().safeParse(x).success : true
		),
	currency: z.string().refine((val) => {
		return val in currencyCodeList;
	}),
	expenseId: z.string(),
});

export const updateBillSchema = z.object({
	name: z.string().min(1),
	description: z.string().max(1024),
	category: z.string().max(50),
	attachmentUrl: z
		.string()
		.refine((x) =>
			Boolean(x) ? z.string().url().optional().safeParse(x).success : true
		)
		.optional(),
	totalAmount: z.number(),
	paidBy: z.string(),
	paidDate: z
		.string()
		.refine((x) => z.string().datetime().safeParse(x).success),
	status: z.nativeEnum(BillStatus),
});

export type CreateBillRequest = z.infer<typeof createBillSchema>;
export type UpdateBillRequest = z.infer<typeof updateBillSchema>;

// responses
export interface GetBillByIdResponse extends ApiResponse<Bill> {}
export interface CreateBillResponse extends ApiResponse<{ id: string }> {}
export interface UpdateBillResponse extends ApiResponse<Bill> {}
export interface GetBillsByExpenseId
	extends ApiResponse<
		{
			id: string;
			name: string;
			category: string;
			totalAmount: number;
			status: BillStatus;
			currency: string;
		}[]
	> {}
