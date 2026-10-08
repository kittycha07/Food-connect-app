const axios = require('axios');

const BOT_TOKEN = 'ใส่_BOT_TOKEN_ของคุณ';
const CHAT_ID = 'ใส่_CHAT_ID_ของร้านค้าหรือกลุ่ม';

async function sendTelegramNotification(message) {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML' // สำคัญ: เพื่อให้ใช้ <b> ตัวหนาได้
    });
  } catch (error) {
    console.error('Telegram Error:', error.response?.data || error.message);
  }
}

module.exports = { sendTelegramNotification };
