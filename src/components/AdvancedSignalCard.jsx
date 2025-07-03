import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdvancedSignalCard({ symbol }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAdvancedSignal = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/signal/multi/${symbol}`);
        setData(res.data);
      } catch (err) {
        console.error('Gelişmiş sinyal alınamadı:', err.message);
      }
    };

    fetchAdvancedSignal();
  }, [symbol]);

  if (!data) return null;

  const colorClass =
    data.signal === 'BUY' ? 'text-green-400' :
    data.signal === 'SELL' ? 'text-red-400' :
    'text-yellow-300';

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded shadow-lg w-fit">
      <h2 className="text-xl font-bold mb-2">📈 Gelişmiş Teknik Analiz ({data.symbol})</h2>
      <ul className="text-sm space-y-1">
        <li>RSI: <strong>{data.rsi}</strong></li>
        <li>EMA(12): <strong>{data.ema12}</strong></li>
        <li>EMA(26): <strong>{data.ema26}</strong></li>
        <li>MACD: <strong>{data.macd}</strong></li>
        <li>MACD Signal: <strong>{data.macdSignal}</strong></li>
        <li>Sinyal: <strong className={colorClass}>{data.signal}</strong></li>
      </ul>
    </div>
  );
}

export default AdvancedSignalCard;