import { Request, Response } from "express";
import { createBill, deleteBill, getBillById, getBillsByExpenseId, updateBill } from "./service";

export const controller = {
	getBillById: async (req: Request, res: Response) => {
		const { id } = req.params;
    const userId = res.locals.userId;
		const bill = await getBillById(id, userId);
		res.status(bill.code).json(bill);
	},
	getBillsByExpenseId: async (req: Request, res: Response) => {
		const { id } = req.params;
		const userId = res.locals.userId;
		const bill = await getBillsByExpenseId(id, userId);
		res.status(bill.code).json(bill);
	},
	createBill: async (req: Request, res: Response) => {
		const { body } = req;
		const userId = res.locals.userId;
		const bill = await createBill(userId, body);
		res.status(bill.code).json(bill);
	},
	updateBill: async (req: Request, res: Response) => {
		const { id } = req.params;
		const { body } = req;
		const userId = res.locals.userId;
		const bill = await updateBill(id, userId, body);
		res.status(bill.code).json(bill);
	},
	deleteBill: async (req: Request, res: Response) => {
		const { id } = req.params;
		const userId = res.locals.userId;
		const bill = await deleteBill(id, userId);
		res.status(bill.code).json(bill);
	},
};