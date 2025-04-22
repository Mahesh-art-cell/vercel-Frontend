import React from "react";
import { Card } from "antd";

const BudgetSummary = ({ budgets, transactions }) => {
  const summary = budgets.map((b) => {
    const spent = transactions
      .filter((t) => t.category === b.category && t.date.startsWith(b.month))
      .reduce((sum, t) => sum + Number(t.amount), 0);
    return { ...b, spent, status: spent > b.amount ? "Over" : "Under" };
  });

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {summary.map((s, i) => (
        <Card key={i} title={`${s.category} - ${s.month}`}>
          <p>Budgeted: ₹{s.amount}</p>
          <p>Spent: ₹{s.spent}</p>
          <p>Status: {s.status} Budget</p>
        </Card>
      ))}
    </div>
  );
};

export default BudgetSummary;
