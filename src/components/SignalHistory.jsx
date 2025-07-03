import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SignalHistory() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/signals', {
          headers: {
            Authorization: token
          }
        });
        setSignals(res.data);
      } catch (err) {
        console.error('Sinyaller alınamadı:', err.message);
      }
    };

    fetchSignals();
  }, []);

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded shadow-lg">
      <h2 className="text-xl font-bold mb-4">📜 Sinyal Geçmişi</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-2">Coin</th>
            <th className="p-2">RSI</th>
            <th className="p-2">Sinyal</th>
            <th className="p-2">Tarih</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((s, i) => (
            <tr key={i} className="border-b border-gray-700 text-sm">
              <td className="p-2">{s.symbol}</td>
              <td className="p-2">{s.rsi.toFixed(2)}</td>
              <td className="p-2">
                <span className={
                  s.signal === 'BUY' ? 'text-green-400' :
                  s.signal === 'SELL' ? 'text-red-400' :
                  'text-yellow-300'
                }>
                  {s.signal}
                </span>
              </td>
              <td className="p-2">{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SignalHistory;