

// import React from 'react';

// export default function TransactionList({ transactions, onDelete }) {
//   return (
//     <div className="mt-6">
//       <h2 className="text-lg font-semibold mb-2">Transaction History</h2>
//       <ul className="space-y-2">
//         {transactions.map((tx) => (
//           <li
//             key={tx._id}
//             className="flex justify-between items-center p-2 border rounded"
//           >
//             <div>
//               <p className="font-medium">{tx.description}</p>
//               <p className="text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</p>
//             </div>
//             <div className="flex items-center gap-4">
//               <span className="text-blue-600 font-bold">₹{tx.amount}</span>
//               <button
//                 onClick={() => onDelete(tx._id)}
//                 className="text-red-500 hover:text-red-700 font-semibold"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


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
