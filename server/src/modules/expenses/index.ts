import { Router } from "express";
import { controller } from "./controller";
import { zodValidator } from "../../middlewares/zodValidator";
import { createExpenseSchema, updateExpenseSchema } from "./types";
import { authenticated } from "../../middlewares/auth";

export function mapExpensesModule() {
	const app = Router();
	app.use(authenticated);
	app.get("/v1/expenses/:id", controller.getExpenseById);
	app.get("/v1/expenses", controller.getAllExpenses);
	app.post(
		"/v1/expenses",
		zodValidator(createExpenseSchema),
		controller.createExpense
	);
	app.put(
		"/v1/expenses/:id",
		zodValidator(updateExpenseSchema),
		controller.updateExpense
	);
	app.delete("/v1/expenses/:id", controller.deleteExpense);
	return app;
}
