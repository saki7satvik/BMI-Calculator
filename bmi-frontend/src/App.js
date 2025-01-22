import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', height: '', weight: '' });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate-bmi', formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult({ error: 'Failed to calculate BMI. Please check your input.' });
    }
  };

  return (
    <div className="App">
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <button type="submit">Calculate BMI</button>
      </form>
      {result && (
        <div className="result">
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
