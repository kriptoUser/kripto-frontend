import React, { useState, useEffect } from 'react';
import SignalCard from './components/SignalCard';
import ChartComponent from './components/ChartComponent';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import SignalHistory from './components/SignalHistory';
import AdvancedSignalCard from './components/AdvancedSignalCard';
import SettingsPage from './components/SettingsPage';

function App() {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [signalData, setSignalData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [page, setPage] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setLoggedIn(true);
  }, []);

  const fetchSignal = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/signal/${symbol}`);
      const data = await response.json();
      setSignalData(data);
    } catch (error) {
      console.error('Sinyal verisi alınamadı:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  if (!loggedIn) {
    if (page === 'settings') {
    return (
      <div className='min-h-screen bg-gray-900 text-white p-6'>
        <Navbar onLogout={logout} onSettings={() => setPage('settings')} />
        <SettingsPage />
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        {showRegister
          ? <RegisterForm onSwitch={() => setShowRegister(false)} />
          : <LoginForm onLogin={() => setLoggedIn(true)} onSwitch={() => setShowRegister(true)} />
        }
      </div>
    );
  }

  if (page === 'settings') {
    return (
      <div className='min-h-screen bg-gray-900 text-white p-6'>
        <Navbar onLogout={logout} onSettings={() => setPage('settings')} />
        <SettingsPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar onLogout={logout} onSettings={() => setPage('settings')} />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Kripto Sinyal Paneli</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="text-black p-2 rounded"
            placeholder="Örn: BTCUSDT"
          />
          <button onClick={fetchSignal} className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
            Sinyal Al
          </button>
        </div>
        {signalData && <SignalCard data={signalData} />}
        <ChartComponent symbol={symbol} />
        <AdvancedSignalCard symbol={symbol} />
              <SignalHistory />
      </div>
    </div>
  );
}

export default App;