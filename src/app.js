const express = require('express');
const app = express();
const { sendTelegramNotification } = require('./telegramService');

app.use(express.json()); // รองรับการรับข้อมูลแบบ JSON จากหน้าเว็บ

// API รับออเดอร์จากหน้าร้าน
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, foodName, price } = req.body;

    // 1. (ตัวอย่าง) บันทึกลง Database ของร้านค้าที่นี่...

    // 2. สร้างข้อความแจ้งเตือน
    const message = `🍕 <b>มีออเดอร์ใหม่เข้ามา!</b>
