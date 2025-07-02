import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ChartComponent({ symbol }) {
  const [chartData, setChartData] = useState(null);
  const [rsi, setRsi] = useState(null);
  const [signal, setSignal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Binance Kapanış Fiyatları
        const pricesRes = await axios.get('https://api.binance.com/api/v3/klines', {
          params: {
            symbol: symbol,
            interval: '1h',
            limit: 50
          }
        });
        const labels = pricesRes.data.map(entry => new Date(entry[0]).toLocaleTimeString());
        const prices = pricesRes.data.map(entry => parseFloat(entry[4]));

        // Backend'den RSI & Sinyal
        const signalRes = await axios.get(`http://localhost:3001/api/signal/${symbol}`);
        setRsi(signalRes.data.rsi);
        setSignal(signalRes.data.signal);

        setChartData({
          labels,
          datasets: [
            {
              label: `${symbol} Price`,
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
              tension: 0.3,
              pointRadius: 2
            }
          ]
        });
      } catch (err) {
        console.error('Grafik verisi alınamadı:', err.message);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded shadow-lg">
      <h3 className="text-lg font-semibold mb-2">Fiyat Grafiği ({symbol})</h3>
      {chartData && <Line data={chartData} />}
      {rsi && signal && (
        <div className="mt-2">
          RSI: <strong>{rsi}</strong> — Sinyal: <span className={
            signal === 'BUY' ? 'text-green-400' :
            signal === 'SELL' ? 'text-red-400' : 'text-yellow-300'
          }>{signal}</span>
        </div>
      )}
    </div>
  );
}

export default ChartComponent;