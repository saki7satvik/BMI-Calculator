const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to calculate BMI
app.post('/calculate-bmi', (req, res) => {
  const { name, height, weight } = req.body;

  if (!name || !height || !weight) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const heightInMeters = height / 100; // Convert height to meters
  const bmi = (weight / (heightInMeters ** 2)).toFixed(2); // BMI formula

  res.json({
    name,
    bmi,
    message: `Hi ${name}, your BMI is ${bmi}.`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
