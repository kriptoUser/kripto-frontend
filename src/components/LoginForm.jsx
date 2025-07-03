import React, { useState } from 'react';
import axios from 'axios';

function LoginForm({ onLogin, onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post('http://localhost:3001/api/login', form);
      localStorage.setItem('token', res.data.token);
      setMessage('Giriş başarılı');
      onLogin();
    } catch (err) {
      setMessage('Giriş başarısız: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Giriş Yap</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input type="email" placeholder="Email" className="p-2 rounded text-black" required
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Şifre" className="p-2 rounded text-black" required
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit" className="bg-green-500 hover:bg-green-600 p-2 rounded text-white">Giriş Yap</button>
      </form>
      <p className="mt-2 text-sm text-yellow-300">{message}</p>
      <p className="mt-2 text-sm">Hesabın yok mu? <button onClick={onSwitch} className="text-blue-400 underline">Kayıt ol</button></p>
    </div>
  );
}

export default LoginForm;