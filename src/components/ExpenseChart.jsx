
// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// export default function ExpenseChart({ transactions }) {
//   const monthlyTotals = transactions.reduce((acc, tx) => {
//     const month = new Date(tx.date).toLocaleString('default', { month: 'short' });
//     acc[month] = (acc[month] || 0) + tx.amount;
//     return acc;
//   }, {});

//   const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
//     name: month,
//     total,
//   }));

//   return (
//     <div style={{ height: 300 }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="total" fill="#3b82f6" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
