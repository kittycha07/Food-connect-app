const { sendTelegramNotification } = require('./telegram');

// ตัวอย่าง: เมื่อมีออเดอร์เข้ามา
app.post('/api/orders', async (req, res) => {
  const { customerName, foodName, price } = req.body;

  // ข้อความแจ้งเตือน (ขึ้นบรรทัดใหม่ได้ตรงๆ ใน Backtick)
  const message = `🍕 <b>มีออเดอร์ใหม่เข้ามา!</b>
👤 <b>ลูกค้า:</b> ${customerName}
🍲 <b>รายการ:</b> ${foodName}
💰 <b>ราคา:</b> ${price} บาท`;

  // ส่งเข้า Telegram
  await sendTelegramNotification(message);

  res.json({ success: true, message: 'บันทึกออเดอร์สำเร็จ' });
});
