import React from 'react';

const CategorySummary = ({ transactions, categories }) => {
  const summaries = categories.map((cat) => {
    const total = transactions
      .filter((t) => t.category === cat.name)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { category: cat.name, total };
  });

  return (
    <div>
      <h3>Category Summary</h3>
      <ul>
        {summaries.map((s, idx) => (
          <li key={idx}>
            {s.category}: ₹{s.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySummary;
