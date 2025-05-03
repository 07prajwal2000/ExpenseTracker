import { Request, Response } from "express";
import { createExpense, getAllExpenses, updateExpense, getExpenseById, deleteExpense } from "./service";

const controller = {
	getAllExpenses: async (req: Request, res: Response) => {
		const userId = res.locals.userId;
		const result = await getAllExpenses(userId);
		res.status(result.code).json(result);
	},
  createExpense: async (req: Request, res: Response) => {
  	const data = req.body;
    const userId = res.locals.userId;
    const result = await createExpense(data, userId);
    res.status(result.code).json(result);
  },
  
  updateExpense: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const userId = res.locals.userId;
    const result = await updateExpense(id, data, userId);
    res.status(result.code).json(result);
  },
  getExpenseById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = res.locals.userId;
    const result = await getExpenseById(id, userId);
    res.status(result.code).json(result);
  },
  deleteExpense: async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = res.locals.userId;
    const result = await deleteExpense(id, userId);
    res.status(result.code).json(result);
  }
};

export { controller };
