const express = require('express');
const { sendTelegramMessage } = require('./telegram');

const app = express();
app.use(express.json());

app.post('/api/order', async (req, res) => {
  // รับข้อมูลจากหน้าเว็บ
  const { foodName, price } = req.body;

  // ส่งแจ้งเตือนเข้า Telegram
  await sendTelegramMessage(`<b>มีรายการสั่งซื้อใหม่!</b>\nเมนู: ${foodName}\nราคา: ${price} บาท`);

  res.json({ success: true, message: 'ส่งคำสั่งซื้อเรียบร้อย' });
});
