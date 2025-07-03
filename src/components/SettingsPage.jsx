import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SettingsPage() {
  const [settings, setSettings] = useState({ emailNotifications: true });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/settings', {
          headers: { Authorization: token }
        });
        setSettings(res.data);
      } catch (err) {
        console.error('Ayarlar alınamadı:', err.message);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/api/settings', settings, {
        headers: { Authorization: token }
      });
      setMessage('Ayarlar güncellendi ✅');
    } catch (err) {
      setMessage('Güncelleme hatası ❌');
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">⚙️ Ayarlar</h2>
      <label className="flex items-center space-x-2 mb-4">
        <input
          type="checkbox"
          name="emailNotifications"
          checked={settings.emailNotifications}
          onChange={handleChange}
          className="h-4 w-4"
        />
        <span>E-posta ile sinyal bildirimi</span>
      </label>
      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Kaydet
      </button>
      {message && <p className="mt-2 text-sm text-yellow-300">{message}</p>}
    </div>
  );
}

export default SettingsPage;