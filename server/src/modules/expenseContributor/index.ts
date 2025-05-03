import { Router } from "express";
import { authenticated } from "../../middlewares/auth";
import { controller } from "./controller";

export function mapExpenseContributorModule() {
	const app = Router();
	app.use(authenticated);
	app.get("/v1/contributor/expense/:expenseId", controller.getContributorsForExpense);
	return app;
}
