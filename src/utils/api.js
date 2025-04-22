import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (err) {
    console.error("Error fetching transactions", err);
  }
};

export const addTransaction = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (err) {
    console.error("Error adding transaction", err);
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (err) {
    console.error("Error updating transaction", err);
  }
};

export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (err) {
    console.error("Error deleting transaction", err);
  }
};

export const BUDGET_API = "http://localhost:5000/api/budgets";
