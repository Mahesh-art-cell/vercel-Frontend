import React, { useState } from "react";
import { Input, Button, Select, Space } from "antd";
import { categories } from "../data/categories"; // add a category list here if not from DB

const BudgetForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ category: "", amount: "", month: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Space direction="vertical" style={{ width: "100%", marginBottom: 20 }}>
      <Select
        placeholder="Category"
        value={form.category}
        onChange={(val) => setForm((prev) => ({ ...prev, category: val }))}
        options={categories.map((cat) => ({ label: cat, value: cat }))}
      />
      <Input
        type="number"
        placeholder="Budget Amount"
        name="amount"
        value={form.amount}
        onChange={handleChange}
      />
      <Input
        placeholder="Month (YYYY-MM)"
        name="month"
        value={form.month}
        onChange={handleChange}
      />
      <Button type="primary" onClick={() => onSubmit(form)}>
        Add Budget
      </Button>
    </Space>
  );
};

export default BudgetForm;
