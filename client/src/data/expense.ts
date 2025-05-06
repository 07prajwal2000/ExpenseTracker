import {
	CreateExpenseRequest,
	CreateExpenseResponse,
	DeleteExpenseResponse,
	GetAllExpensesResponse,
	GetExpenseByIdResponse,
  UpdateExpenseRequest,
  UpdateExpenseResponse,
} from "@expensetracker/backend";
import { http } from "../lib/http";

export async function getAllExpenses() {
	const response = await http.get<GetAllExpensesResponse>("/expenses");
	return response.data;
}

export async function getExpense(id: string) {
	const response = await http.get<GetExpenseByIdResponse>(`/expenses/${id}`);
	return response.data;
}

export async function createExpense(data: CreateExpenseRequest) {
	const response = await http.post<CreateExpenseResponse>("/expenses", data);
	return response.data;
}

export async function updateExpense(id: string, data: UpdateExpenseRequest) {
	const response = await http.put<UpdateExpenseResponse>(
		`/expenses/${id}`,
		data
	);
	return response.data;
}

export async function deleteExpense(id: string) {
	const response = await http.delete<DeleteExpenseResponse>(`/expenses/${id}`);
	return response.data;
}