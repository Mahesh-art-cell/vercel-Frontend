import React from "react";
import { Button, List } from "antd";

const BudgetList = ({ budgets, onDelete }) => (
  <List
    header="Budgets"
    bordered
    dataSource={budgets}
    renderItem={(b) => (
      <List.Item
        actions={[<Button danger onClick={() => onDelete(b._id)}>Delete</Button>]}
      >
        {b.month} - {b.category}: ₹{b.amount}
      </List.Item>
    )}
  />
);

export default BudgetList;
