import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('http://localhost:3001/api/register', form);
      setMessage('Kayıt başarılı. Giriş yapabilirsiniz.');
    } catch (err) {
      setMessage('Kayıt başarısız: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Kayıt Ol</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input placeholder="Adınız" className="p-2 rounded text-black" required
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="p-2 rounded text-black" required
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Şifre" className="p-2 rounded text-black" required
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white">Kayıt Ol</button>
      </form>
      <p className="mt-2 text-sm text-yellow-300">{message}</p>
      <p className="mt-2 text-sm">Zaten hesabın var mı? <button onClick={onSwitch} className="text-blue-400 underline">Giriş yap</button></p>
    </div>
  );
}

export default RegisterForm;