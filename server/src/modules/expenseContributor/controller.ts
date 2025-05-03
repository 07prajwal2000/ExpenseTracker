import { Request, Response } from "express";
import { getContributorsFromExpenseId } from "./service";

export const controller = {
  getContributorsForExpense: async (req: Request, res: Response) => {
    const { expenseId } = req.params;
    const userId = res.locals.userId;
    const result = await getContributorsFromExpenseId(expenseId, userId);
    res.status(result.code).json(result);
  }
};