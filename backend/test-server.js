const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Test contact endpoint (without database)
app.post('/api/test/contact', (req, res) => {
  console.log('Contact form data:', req.body);
  res.json({ 
    success: true, 
    message: 'Test successful - data received',
    data: req.body
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[INFO] Test server running on http://localhost:${PORT}`);
  console.log(`[INFO] Test health: http://localhost:${PORT}/api/health`);
  console.log(`[WARNING]  MongoDB not connected - using test mode`);
});
