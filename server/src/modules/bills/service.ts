import { uuidv7 } from "uuidv7";
import {
	hasContributorAccessToExpense,
	hasUserAccessToExpense,
  isUserOwnerOfExpense,
} from "../expenses/repository";
import {
	findBillById,
	userHasPermissionToBill,
	createBill as createBillRepo,
  updateBill as updateBillRepo,
  deleteBill as deleteBillRepo,
  findBillsByExpenseId,
} from "./repository";
import {
	BillStatus,
	CreateBillRequest,
	CreateBillResponse,
	GetBillByIdResponse,
  GetBillsByExpenseId,
  UpdateBillRequest,
  UpdateBillResponse,
} from "./types";

export async function getBillById(
	billId: string,
	userId: string
): Promise<GetBillByIdResponse> {
	const hasPermission = await userHasPermissionToBill(userId, billId);
	if (!hasPermission) {
		return {
			code: 403,
			message:
				"You do not have permission to access this bill or bill not found",
		};
	}
	const bill = await findBillById(billId);
	if (!bill) {
		return {
			code: 404,
			message: "Bill not found",
		};
	}
	return {
		code: 200,
		data: bill,
	};
}

export async function createBill(
	userId: string,
	data: CreateBillRequest
): Promise<CreateBillResponse> {
	const hasPermission = await hasUserAccessToExpense(data.expenseId, userId);
	const payerHasPermission = await hasContributorAccessToExpense(
		data.expenseId,
		data.paidBy
	);

	if (!hasPermission || !payerHasPermission) {
		return {
			code: 403,
			message: !payerHasPermission
				? "Payer does not have permission to access this expense or expense not found"
				: "You do not have permission to access this expense or expense not found",
		};
	}
	const createdId = await createBillRepo({
		id: uuidv7(),
    total_amount: data.totalAmount,
    paid_by: data.paidBy,
    expense_id: data.expenseId,
    paid_date: new Date(data.paidDate),
    attachment_url: data.attachmentUrl ?? "",
		created_at: new Date(),
		status: BillStatus.UN_PAID,
    deleted: false,
    category: data.category,
    currency: data.currency,
    description: data.description,
    name: data.name,
	});
	return {
		code: 200,
		data: {
			id: createdId,
		},
	};
}

export async function updateBill(
	billId: string,
	userId: string,
	data: UpdateBillRequest
): Promise<UpdateBillResponse> {
	const hasPermission = await userHasPermissionToBill(userId, billId);
	if (!hasPermission) {
		return {
			code: 403,
			message:
				"You do not have permission to access this bill or bill not found",
		};
	}
	const bill = await findBillById(billId);
	if (!bill) {
		return {
			code: 404,
			message: "Bill not found",
		}
	}
  
  console.log(bill.paid_by);
  bill.name = data.name;
  bill.description = data.description;
  bill.category = data.category;
  bill.attachment_url = data.attachmentUrl ?? "";
  bill.total_amount = data.totalAmount;
  bill.paid_by = data.paidBy;
  bill.paid_date = new Date(data.paidDate);
  bill.status = data.status;
  
  const updated = await updateBillRepo(bill);
  
  if (!updated) {
    return {
      code: 500,
      message: "Something went wrong",
    }
  }
  
  return {
    code: 200,
    data: bill,
  };
}

export async function getBillsByExpenseId(
	expenseId: string,
	userId: string
): Promise<GetBillsByExpenseId>  {
	const hasPermission = await hasUserAccessToExpense(expenseId, userId);
	if (!hasPermission) {
		return {
			code: 403,
			message: "You do not have permission to access this expense or expense not found",
		};
	}
	const bills = await findBillsByExpenseId(expenseId);
	if (bills.length === 0) {
		return {
			code: 404,
			message: "Bills not found",
		};
	}
	return {
		code: 200,
		data: bills.map((bill) => ({
      id: bill.id,
      name: bill.name,
      category: bill.category,
      totalAmount: bill.total_amount,
      status: bill.status,
      currency: bill.currency,
    })),
	}
}

export async function deleteBill(
	billId: string,
	userId: string
) {
  const hasBillPermission = await userHasPermissionToBill(userId, billId);
  if (!hasBillPermission) {
    return {
      code: 403,
      message: "You do not have permission to access this bill or bill not found",
    };
  }
  const bill = await findBillById(billId);
  if (!bill) {
    return {
      code: 404,
      message: "Bill not found",
    };
  }
  const hasPermission = await isUserOwnerOfExpense(bill.expense_id, userId);
  if (!hasPermission) {
    return {
      code: 403,
      message: "You do not have permission to access this expense or expense not found",
    };
  }
  const deleted = await deleteBillRepo(billId);
  if (!deleted) {
    return {
      code: 500,
      message: "Something went wrong",
    };
  }
  return {
    code: 200,
    message: "Bill deleted",
  };
}