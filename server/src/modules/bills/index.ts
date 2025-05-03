import { Router } from "express";
import { authenticated } from "../../middlewares/auth";
import { controller } from "./controller";
import { zodValidator } from "../../middlewares/zodValidator";
import { createBillSchema, updateBillSchema } from "./types";

export function mapBillsModule() {
	const app = Router();
	app.use(authenticated);
	app.get("/v1/bills/expenses/:id", controller.getBillsByExpenseId);
	app.get("/v1/bills/:id", controller.getBillById);
	app.post("/v1/bills", zodValidator(createBillSchema), controller.createBill);
	app.put("/v1/bills/:id", zodValidator(updateBillSchema), controller.updateBill);
	app.delete("/v1/bills/:id", controller.deleteBill);
	return app;
}