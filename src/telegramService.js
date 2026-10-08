const axios = require('axios');

async function sendTelegramMessage(message) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  if (!token || !chatId) {
    console.error('กรุณาตั้งค่า TELEGRAM_BOT_TOKEN และ TELEGRAM_CHAT_ID ใน .env');
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    console.log('ส่ง Telegram สำเร็จ');
  } catch (error) {
    console.error('ส่ง Telegram ล้มเหลว:', error.response?.data || error.message);
  }
}

module.exports = { sendTelegramMessage };
