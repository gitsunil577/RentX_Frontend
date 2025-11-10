import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DebugPage() {
  const [localStorageData, setLocalStorageData] = useState({});
  const [apiData, setApiData] = useState(null);
  const [status, setStatus] = useState('');

  const checkLocalStorage = () => {
    const data = {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      accessToken: localStorage.getItem('accessToken')?.substring(0, 20) + '...',
      refreshToken: localStorage.getItem('refreshToken')?.substring(0, 20) + '...',
      userData: localStorage.getItem('userData'),
      user: localStorage.getItem('user'),
    };
    setLocalStorageData(data);
  };

  const fetchFromAPI = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setStatus('❌ No access token found');
      return;
    }

    try {
      setStatus('🔄 Fetching from API...');
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/current-user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApiData(response.data.data);
      setStatus('✅ Data fetched successfully');
    } catch (error) {
      setStatus('❌ API Error: ' + error.message);
      console.error(error);
    }
  };

  const fixUserData = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('No token found. Please login first.');
      return;
    }

    try {
      setStatus('🔧 Fixing user data...');

      // Fetch fresh data
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/current-user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userData = response.data.data;

      // Save it properly
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');

      // Dispatch event
      window.dispatchEvent(new Event('userDataUpdated'));

      setStatus('✅ User data fixed! Refresh the page.');
      checkLocalStorage();

      alert('Fixed! Refresh the page (F5) to see cart button.');
    } catch (error) {
      setStatus('❌ Fix failed: ' + error.message);
    }
  };

  const clearAll = () => {
    localStorage.clear();
    setStatus('🗑️ localStorage cleared');
    checkLocalStorage();
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">🔧 Debug Tool</h1>

        {/* Status */}
        <div className="bg-slate-800 rounded-lg p-4 mb-4">
          <p className="text-white">{status || 'Ready'}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={checkLocalStorage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Check localStorage
          </button>
          <button
            onClick={fetchFromAPI}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Fetch from API
          </button>
          <button
            onClick={fixUserData}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-bold"
          >
            🔧 FIX NOW
          </button>
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
          >
            Clear All
          </button>
        </div>

        {/* localStorage Data */}
        <div className="bg-slate-800 rounded-lg p-6 mb-4">
          <h2 className="text-xl font-bold text-white mb-4">📦 localStorage</h2>
          <pre className="text-green-300 text-sm overflow-auto">
            {JSON.stringify(localStorageData, null, 2)}
          </pre>
        </div>

        {/* API Data */}
        {apiData && (
          <div className="bg-slate-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">🌐 API Data</h2>
            <pre className="text-blue-300 text-sm overflow-auto">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-6 mt-8">
          <h3 className="text-yellow-300 font-bold mb-2">📋 Instructions:</h3>
          <ol className="text-yellow-200 space-y-2 list-decimal list-inside">
            <li>Click "Check localStorage" to see what's saved</li>
            <li>Click "Fetch from API" to get current user data</li>
            <li>If userData is missing or null, click "🔧 FIX NOW"</li>
            <li>Refresh the page (F5) after fixing</li>
            <li>Cart button should now appear!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
