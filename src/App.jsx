


// import React, { useEffect, useState } from 'react';
// import TransactionForm from './components/TransactionForm';
// import TransactionList from './components/TransactionList';
// import ExpenseChart from './components/ExpenseChart';

// export default function App() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     fetch('/api/transactions')
//       .then((res) => res.json())
//       .then(setTransactions)
//       .catch((err) => console.error('Error fetching transactions:', err));
//   }, []);

//   const addTransaction = async (tx) => {
//     try {
//       const res = await fetch('/api/transactions', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(tx),
//       });
//       const data = await res.json();
//       setTransactions([data, ...transactions]);
//     } catch (err) {
//       console.error('Error adding transaction:', err);
//     }
//   };

//   const deleteTransaction = async (id) => {
//     try {
//       await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
//       setTransactions(transactions.filter((tx) => tx._id !== id));
//     } catch (err) {
//       console.error('Error deleting transaction:', err);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Personal Finance Visualizer</h1>
//       <TransactionForm onSubmit={addTransaction} />
//       <ExpenseChart transactions={transactions} />
//       <TransactionList transactions={transactions} onDelete={deleteTransaction} />
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from "./utils/api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Helper function to get month name
const getMonthName = (monthIndex) => {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return monthNames[monthIndex];
};

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };
    fetchTransactions();
  }, []);

  const handleAddEditTransaction = async (data) => {
    if (editing) {
      await updateTransaction(editing._id, data);
    } else {
      await addTransaction(data);
    }
    setEditing(null);
    const updatedData = await getTransactions();
    setTransactions(updatedData);
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    const updatedData = await getTransactions();
    setTransactions(updatedData);
  };

  const handleEditTransaction = (transaction) => {
    setEditing(transaction);
  };

  // Aggregating transactions per month for chart
  const chartData = transactions.reduce((acc, { amount, date }) => {
    const month = new Date(date).getMonth(); // Get month index (0 for January, 11 for December)
    if (!acc[month]) acc[month] = { month, total: 0 };
    acc[month].total += amount;
    return acc;
  }, []);

  // Convert month index to month name
  const formattedChartData = Object.values(chartData).map((data) => ({
    ...data,
    month: getMonthName(data.month), // Map month index to name (e.g., "Jan", "Feb")
  }));

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      <TransactionForm onSubmit={handleAddEditTransaction} transaction={editing} />
      <TransactionList
        transactions={transactions}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditTransaction}
      />
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
