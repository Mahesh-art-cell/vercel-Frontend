import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/transactions`;
const BUDGET_API = `${import.meta.env.VITE_API_URL}/api/budgets`;

const handleError = (err, action) => {
  console.error(`Error ${action}`, err);
  // Optionally, you can display a user-friendly message to the UI
  return { error: true, message: `Error ${action}, please try again later.` };
};

export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL);
    
    // Ensure the response is an array before returning
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      // Return empty array if data is not in expected format
      console.error("API response is not an array:", response.data);
      return [];
    }
  } catch (err) {
    return handleError(err, 'fetching transactions');
  }
};

export const addTransaction = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (err) {
    return handleError(err, 'adding transaction');
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (err) {
    return handleError(err, 'updating transaction');
  }
};

export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return { success: true };
  } catch (err) {
    return handleError(err, 'deleting transaction');
  }
};

export { BUDGET_API };



