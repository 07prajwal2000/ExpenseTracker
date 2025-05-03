import express from "express";
import { initPostgres } from "./lib/postgres";
import { config } from "dotenv";
import { mapExpensesModule } from "./modules/expenses";
import { mapBillsModule } from "./modules/bills";
import { mapExpenseContributorModule } from "./modules/expenseContributor";

config();
initPostgres();
export const app = express();
app.use(express.json());
app.use("/api", mapExpensesModule());
app.use("/api", mapBillsModule());
app.use("/api", mapExpenseContributorModule());