import React from 'react';

function Navbar({ onLogout, onSettings }) {
  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">🪙 Kripto Sinyal</h1>
      <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white">
        Çıkış Yap
      </button>
      <div className='flex gap-2'>
    <button onClick={onSettings} className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white'>Ayarlar</button>
    <button onClick={onLogout} className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white'>Çıkış</button>
  </div>
</div>
  );
}

export default Navbar;