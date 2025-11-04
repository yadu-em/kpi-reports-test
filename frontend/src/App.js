import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHelloMessage = async () => {
      try {
        // Use the backend API directly (CORS is configured)
        const response = await axios.get('http://localhost:8000/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Check if response is actually JSON
        if (response.status === 200 && response.data && response.data.message) {
          setMessage(response.data.message);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHelloMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>KPI Reports</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && message && (
          <p className="hello-message">{message}</p>
        )}
      </header>
    </div>
  );
}

export default App;

