import React from 'react';

function SignalCard({ data }) {
  const { symbol, rsi, signal } = data;
  const signalColor = signal === 'BUY' ? 'text-green-400' : signal === 'SELL' ? 'text-red-400' : 'text-yellow-300';

  return (
    <div className="p-4 bg-gray-800 rounded shadow-lg w-fit">
      <h2 className="text-xl font-bold">{symbol}</h2>
      <p>RSI: <strong>{rsi}</strong></p>
      <p>Sinyal: <strong className={signalColor}>{signal}</strong></p>
    </div>
  );
}

export default SignalCard;