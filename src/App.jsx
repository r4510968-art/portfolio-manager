import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import PortfolioForm from './components/PortfolioForm';
import PortfolioList from './components/PortfolioList';
import PortfolioChart from './components/PortfolioChart';

export default function App() {
  const [portfolio, setPortfolio] = useState([]);
  const [form, setForm] = useState({ symbol: '', quantity: '', avg_price: '' });
  const [editId, setEditId] = useState(null);

  const fetchPortfolio = async () => {
    const { data, error } = await supabase.from('portfolio').select('*').order('id');
    if (error) console.error(error);
    else setPortfolio(data);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await supabase.from('portfolio').update({
        symbol: form.symbol,
        quantity: Number(form.quantity),
        avg_price: Number(form.avg_price),
      }).eq('id', editId);
      setEditId(null);
    } else {
      await supabase.from('portfolio').insert([{
        symbol: form.symbol,
        quantity: Number(form.quantity),
        avg_price: Number(form.avg_price),
      }]);
    }
    setForm({ symbol: '', quantity: '', avg_price: '' });
    fetchPortfolio();
  };

  const handleDelete = async (id) => {
    await supabase.from('portfolio').delete().eq('id', id);
    fetchPortfolio();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ symbol: item.symbol, quantity: item.quantity, avg_price: item.avg_price });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Portfolio Manager</h1>
      <PortfolioForm form={form} setForm={setForm} handleSubmit={handleSubmit} editId={editId} />
      <PortfolioList portfolio={portfolio} handleEdit={handleEdit} handleDelete={handleDelete} />
      <PortfolioChart portfolio={portfolio} />
    </div>
  );
}
