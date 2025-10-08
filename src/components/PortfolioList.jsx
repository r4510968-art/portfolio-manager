import React from 'react';

export default function PortfolioList({ portfolio, handleEdit, handleDelete }) {
  return (
    <ul className="mb-6">
      {portfolio.map((p) => (
        <li key={p.id} className="flex justify-between border-b py-2">
          <span>{p.symbol} — Qty: {p.quantity} — Avg: {p.avg_price}</span>
          <div>
            <button className="text-green-500 mr-2" onClick={() => handleEdit(p)}>Edit</button>
            <button className="text-red-500" onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
