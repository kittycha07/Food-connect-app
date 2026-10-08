require('dotenv').config();
const express = require('express');
const restaurantRoutes = require('./restaurantRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware สำหรับอ่าน JSON payload
app.use(express.json());

// Routes หลัก
app.use('/api', restaurantRoutes);

// Route ทดสอบระบบ
app.get('/', (req, res) => {
  res.send('Welcome to food-connect API Backend!');
});

// เริ่มรัน Server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 food-connect server running on port ${PORT}`);
  console.log(`=================================`);
});
