const { sendTelegramNotification } = require('./telegram');

// ตัวอย่าง: เมื่อมีออเดอร์เข้ามา
app.post('/api/orders', async (req, res) => {
  const { customerName, foodName, price } = req.body;

  // ข้อความแจ้งเตือน
  const message = `🍕 <b>มีออเดอร์ใหม่เข้ามา!</b>\n\n` +
                  `👤 <b>ลูกค้า:</b> ${customerName}\n` +
                  `🍲 <b>รายการ:</b> ${foodName}\n` +
                  `💰 <b>ราคา:</b> ${price} บาท`;

  // ส่งเข้า Telegram
  await sendTelegramNotification(message);

  res.json({ success: true, message: 'บันทึกออเดอร์สำเร็จ' });
});
