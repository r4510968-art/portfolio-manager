import React from 'react';

export default function PortfolioForm({ form, setForm, handleSubmit, editId }) {
  return (
    <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
      <input
        required
        placeholder="Symbol"
        className="border p-1 flex-1"
        value={form.symbol}
        onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
      />
      <input
        required
        type="number"
        placeholder="Quantity"
        className="border p-1 w-24"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />
      <input
        required
        type="number"
        placeholder="Avg Price"
        className="border p-1 w-24"
        value={form.avg_price}
        onChange={(e) => setForm({ ...form, avg_price: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4">{editId ? 'Update' : 'Add'}</button>
    </form>
  );
}
