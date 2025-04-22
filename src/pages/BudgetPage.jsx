import React, { useEffect, useState } from "react";
import axios from "axios";
import { BUDGET_API } from "../utils/api";
import BudgetForm from "../components/BudgetForm";
import BudgetList from "../components/BudgetList";
import BudgetSummary from "../components/BudgetSummary";
import { TRANSACTION_API } from "../utils/api";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchAll = async () => {
    const [bRes, tRes] = await Promise.all([
      axios.get(BUDGET_API),
      axios.get(TRANSACTION_API),
    ]);
    setBudgets(bRes.data);
    setTransactions(tRes.data);
  };

  const addBudget = async (data) => {
    await axios.post(BUDGET_API, data);
    fetchAll();
  };

  const deleteBudget = async (id) => {
    await axios.delete(`${BUDGET_API}/${id}`);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      <h2>Monthly Budgets</h2>
      <BudgetForm onSubmit={addBudget} />
      <BudgetList budgets={budgets} onDelete={deleteBudget} />
      <BudgetSummary budgets={budgets} transactions={transactions} />
    </div>
  );
};

export default BudgetPage;
