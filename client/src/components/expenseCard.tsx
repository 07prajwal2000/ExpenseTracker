import React from "react"

type ExpenseCardType = {
  title: string;
  totalBills: number;
  totalContributors: number;
  totalPaid: number;
  totalDue: number;
}

const ExpenseCard: React.FC<ExpenseCardType> = (props) => {
  return (
    <div>ExpenseCard</div>
  )
}

export default ExpenseCard