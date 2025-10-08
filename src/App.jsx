import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function App() {
  // Simple portfolio state stored in localStorage (works offline, both web & mobile browsers)
  const [positions, setPositions] = useState(() => {
    try {
      const raw = localStorage.getItem('pm_positions')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  const [form, setForm] = useState({ symbol: '', qty: '', price: '' })

  useEffect(() => {
    localStorage.setItem('pm_positions', JSON.stringify(positions))
  }, [positions])

  function addPosition(e) {
    e.preventDefault()
    if (!form.symbol || !form.qty) return
    const newPos = {
      id: Date.now(),
      symbol: form.symbol.toUpperCase(),
      qty: Number(form.qty),
      avgPrice: Number(form.price) || 0,
      createdAt: new Date().toISOString(),
    }
    setPositions((p) => [newPos, ...p])
    setForm({ symbol: '', qty: '', price: '' })
  }

  function removePosition(id) {
    setPositions((p) => p.filter((x) => x.id !== id))
  }

  // Dummy price series for chart demo — in a real app hook this to live price API
  const labels = ['T-6', 'T-5', 'T-4', 'T-3', 'T-2', 'T-1', 'Now']
  const dataset = {
    labels,
    datasets: [
      {
        label: 'Portfolio value (demo)',
        data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 1000) + 5000),
        tension: 0.3,
      },
    ],
  }

  const totalValue = positions.reduce((s, p) => s + p.qty * (p.avgPrice || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Portfolio Manager</h1>
          <div className="text-sm text-gray-600">Local-only demo · works offline</div>
        </header>

        <section className="mb-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <form onSubmit={addPosition} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input value={form.symbol} onChange={(e)=>setForm({...form, symbol:e.target.value})} placeholder="Symbol (e.g. AAPL)" className="p-2 border rounded" />
              <input value={form.qty} onChange={(e)=>setForm({...form, qty:e.target.value})} placeholder="Quantity" inputMode="numeric" className="p-2 border rounded" />
              <input value={form.price} onChange={(e)=>setForm({...form, price:e.target.value})} placeholder="Avg price (optional)" inputMode="decimal" className="p-2 border rounded" />
              <button className="bg-sky-600 text-white px-4 py-2 rounded">Add</button>
            </form>

            <div className="mt-4 text-sm text-gray-700">Total invested (sum qty * avgPrice): <strong>{totalValue.toLocaleString()}</strong></div>
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-medium mb-3">Positions</h2>
            {positions.length === 0 ? (
              <div className="text-gray-500">No positions yet — add one above.</div>
            ) : (
              <ul className="space-y-3">
                {positions.map((pos) => (
                  <li key={pos.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{pos.symbol}</div>
                      <div className="text-sm text-gray-500">Qty: {pos.qty} · Avg: {pos.avgPrice || '-'} · Added: {new Date(pos.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>removePosition(pos.id)} className="text-sm text-red-600">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-medium mb-3">Portfolio chart (demo)</h2>
            <div className="w-full">
              <Line data={dataset} />
            </div>
          </div>
        </section>

        <footer className="mt-6 text-xs text-gray-500 text-center">Built with React, Tailwind & Chart.js — mobile friendly</footer>
      </div>
    </div>
  )
}