import React from 'react';

const CategoryList = ({ categories, onDelete }) => (
  <ul>
    {categories.map((cat) => (
      <li key={cat._id}>
        {cat.name}
        <button onClick={() => onDelete(cat._id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default CategoryList;
