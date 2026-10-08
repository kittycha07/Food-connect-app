const express = require('express');
const router = express.Router();
const { sendTelegramNotification } = require('./telegramService');
const { formatNewRestaurantMsg, formatNewOrderMsg } = require('./formatTelegramMessage');

// ฐานข้อมูลจำลอง (Mock Database)
let restaurants = [
  { id: 1, name: 'ส้มตำแซ่บเวอร์', category: 'อาหารไทย/อีสาน', phone: '081-111-2222', location: 'สยามสแควร์', rating: 4.8 },
  { id: 2, name: 'Ramen House', category: 'อาหารญี่ปุ่น', phone: '082-333-4444', location: 'อโศก', rating: 4.5 }
];

let orders = [];

// [GET] /api/restaurants - ดึงรายชื่อร้านอาหารทั้งหมด
router.get('/restaurants', (req, res) => {
  res.json({
    app: 'food-connect',
    total: restaurants.length,
    data: restaurants
  });
});

// [POST] /api/restaurants - เพิ่มร้านอาหารใหม่
router.post('/restaurants', async (req, res) => {
  const { name, category, phone, location, rating } = req.body;

  if (!name || !category) {
    return res.status(400).json({ error: 'กรุณาระบุชื่อร้านและหมวดหมู่อาหาร' });
  }

  const newRestaurant = {
    id: restaurants.length + 1,
    name,
    category,
    phone: phone || '',
    location: location || '',
    rating: rating || 5.0
  };

  restaurants.push(newRestaurant);

  // จัดข้อความและส่งแจ้งเตือนเข้า Telegram
  const message = formatNewRestaurantMsg(newRestaurant);
  await sendTelegramNotification(message);

  res.status(201).json({
    message: 'เพิ่มร้านอาหารใน food-connect สำเร็จ และแจ้งเตือน Telegram แล้ว',
    data: newRestaurant
  });
});

// [POST] /api/orders - สั่งซื้ออาหารและแจ้งเตือนเข้า Telegram
router.post('/orders', async (req, res) => {
  const { restaurantName, customerName, items, totalPrice } = req.body;

  if (!restaurantName || !totalPrice) {
    return res.status(400).json({ error: 'กรุณาระบุชื่อร้านและราคารวม' });
  }

  const newOrder = {
    id: orders.length + 1001,
    restaurantName,
    customerName,
    items,
    totalPrice
  };

  orders.push(newOrder);

  // จัดข้อความและส่งแจ้งเตือนเข้า Telegram
  const message = formatNewOrderMsg(newOrder);
  await sendTelegramNotification(message);

  res.status(201).json({
    message: 'สร้างคำสั่งซื้อสำเร็จ และส่งข้อมูลไป Telegram เรียบร้อย',
    data: newOrder
  });
});

module.exports = router;
