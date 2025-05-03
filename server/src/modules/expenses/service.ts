import { CreateExpenseRequest, GetAllExpensesResponse, CreateExpenseResponse, UpdateExpenseRequest, UpdateExpenseResponse, Expense, GetExpenseByIdResponse, DeleteExpenseResponse } from "./types";
import { findExpensesByUserId, createExpense as createExpenseRepo, updateExpense as updateExpenseRepo, findExpenseById, deleteExpense as deleteExpenseRepo } from "./repository";
import { uuidv7 } from "uuidv7";

export async function getAllExpenses(userId: string): Promise<GetAllExpensesResponse> {
  try {
    const expenses = await findExpensesByUserId(userId);
    return {
      code: 200,
      data: expenses
    };
  } catch (error) {
    return {
      code: 500,
      message: "Failed to fetch expenses"
    };
  }
}

export async function createExpense(data: CreateExpenseRequest, userId: string): Promise<CreateExpenseResponse> {
  try {
    const expense: Expense = {
      id: uuidv7(),
      title: data.title,
      description: data.description,
      owner: userId,
      created_at: new Date()
    };

    const createdExpense = await createExpenseRepo(expense);
    return {
      code: 201,
      data: createdExpense
    };
  } catch (error) {
    return {
      code: 500,
      message: "Failed to create expense"
    };
  }
}

export async function updateExpense(
  expenseId: string,
  data: UpdateExpenseRequest,
  userId: string
): Promise<UpdateExpenseResponse> {
  try {
    const updatedExpense = await updateExpenseRepo(expenseId, userId, {
      title: data.title,
      description: data.description
    });

    if (!updatedExpense) {
      return {
        code: 404,
        message: "Expense not found or you don't have permission to update it"
      };
    }

    return {
      code: 200,
      data: updatedExpense
    };
  } catch (error) {
    return {
      code: 500,
      message: "Failed to update expense"
    };
  }
}

export async function getExpenseById(
  expenseId: string,
  userId: string
): Promise<GetExpenseByIdResponse> {
  try {
    const expense = await findExpenseById(expenseId, userId);
    
    if (!expense) {
      return {
        code: 404,
        message: "Expense not found or you don't have permission to view it"
      };
    }

    return {
      code: 200,
      data: expense
    };
  } catch (error) {
    return {
      code: 500,
      message: "Failed to fetch expense"
    };
  }
}

export async function deleteExpense(
  expenseId: string,
  userId: string
): Promise<DeleteExpenseResponse> {
  try {
    const deletedExpense = await deleteExpenseRepo(expenseId, userId);

    if (!deletedExpense) {
      return {
        code: 404,
        message: "Expense not found or you don't have permission to delete it"
      };
    }

    return {
      code: 200,
      data: deletedExpense
    };
  } catch (error) {
    return {
      code: 500,
      message: "Failed to delete expense"
    };
  }
}