
import React from "react";
import { Button, Space } from "antd";

const TransactionList = ({ transactions, onDelete, onEdit }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {transactions.map((transaction) => (
        <li
          key={transaction._id}
          style={{
            marginBottom: "12px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            ₹{transaction.amount} | {transaction.date} | {transaction.description}
          </span>
          <Space>
            <Button type="primary" onClick={() => onEdit(transaction)}>
              Edit
            </Button>
            <Button danger onClick={() => onDelete(transaction._id)}>
              Delete
            </Button>
          </Space>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
