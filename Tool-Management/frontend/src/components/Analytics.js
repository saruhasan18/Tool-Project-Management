import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransactions }) => {
  // Categories
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  // Total Transactions
  const totalTransactions = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpensePercent =
    (totalExpenseTransactions.length / totalTransactions) * 100;

  // Total Turnover
  const totalTurnover = allTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total Transactions</div>
            <div className="card-body">
              <h5 className="text-success">
                Income: {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger">
                Expense: {totalExpenseTransactions.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <h4>Category Wise Income</h4>
          {categories.map((category) => {
            const amount = allTransactions
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card" key={category}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={(
                        (amount / totalIncomeTurnover) *
                        100
                      ).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-6">
          <h4>Category Wise Expense</h4>
          {categories.map((category) => {
            const amount = allTransactions
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card" key={category}>
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={(
                        (amount / totalExpenseTurnover) *
                        100
                      ).toFixed(0)}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Analytics;

