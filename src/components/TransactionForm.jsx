

// import React, { useState } from 'react';

// export default function TransactionForm({ onSubmit }) {
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!amount || !date || !description) return alert('All fields are required');
//     onSubmit({ amount: parseFloat(amount), date, description });
//     setAmount('');
//     setDate('');
//     setDescription('');
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2 mb-4">
//       <input className="input" placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
//       <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
//       <input className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//       <button className="btn" type="submit">Add</button>
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";
import { Input, Button, Space, DatePicker, Select } from "antd";
import dayjs from "dayjs";

const TransactionForm = ({ onSubmit, transaction, categories = [] }) => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD"),
    category: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        category: transaction.category || "",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prev) => ({
      ...prev,
      date: dateString,
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      amount: "",
      description: "",
      date: dayjs().format("YYYY-MM-DD"),
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          type="number"
          placeholder="Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <Input
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <DatePicker
          value={dayjs(formData.date)}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        />
        <Select
          placeholder="Select Category"
          value={formData.category}
          onChange={handleCategoryChange}
          style={{ width: "100%" }}
        >
          {(categories || []).map((cat) => (
            <Select.Option key={cat._id} value={cat.name}>
              {cat.name}
            </Select.Option>
          ))}
        </Select>
        <Button type="primary" htmlType="submit">
          {transaction ? "Update" : "Add"} Transaction
        </Button>
      </Space>
    </form>
  );
};

export default TransactionForm;
