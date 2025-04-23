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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      const data = await getTransactions();
      
      // Check if data is valid (not an error object)
      if (!data.error) {
        setTransactions(data);
      } else {
        setError(data.message);
        setTransactions([]); // Initialize with empty array on error
      }
      setIsLoading(false);
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
    if (!updatedData.error) {
      setTransactions(updatedData);
    }
  };

  const handleDeleteTransaction = async (id) => {
    await deleteTransaction(id);
    const updatedData = await getTransactions();
    if (!updatedData.error) {
      setTransactions(updatedData);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditing(transaction);
  };

  // Safely generate chart data - using a safer approach
  const prepareChartData = () => {
    // Make sure transactions is an array before using reduce
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return [];
    }
    
    // Safely aggregate transactions by month
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      if (transaction && transaction.date && transaction.amount !== undefined) {
        const month = new Date(transaction.date).getMonth();
        const amount = parseFloat(transaction.amount) || 0;
        
        if (!monthlyData[month]) {
          monthlyData[month] = { month, total: 0 };
        }
        
        monthlyData[month].total += amount;
      }
    });
    
    // Convert object to array and add month names
    return Object.values(monthlyData).map(data => ({
      ...data,
      month: getMonthName(data.month)
    }));
  };

  // Generate chart data
  const formattedChartData = prepareChartData();

  return (
    <div>
      <h1>Personal Finance Tracker</h1>
      {error && <div className="error-message">{error}</div>}
      {isLoading ? (
        <div>Loading transactions...</div>
      ) : (
        <>
          <TransactionForm onSubmit={handleAddEditTransaction} transaction={editing} />
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={handleEditTransaction}
          />
          {formattedChartData.length > 0 ? (
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
          ) : (
            <p>No transaction data to display in chart</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;


