const axios = require('axios');

/**
 * ฟังก์ชันสำหรับส่งข้อความแจ้งเตือนเข้า Telegram Chat / Group / Channel
 * @param {string} messageText - ข้อความที่จะส่ง (รองรับ HTML tags เช่น <b>, <i>)
 */
async function sendTelegramNotification(messageText) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('⚠️ กรุณาตั้งค่า TELEGRAM_BOT_TOKEN และ TELEGRAM_CHAT_ID ใน .env');
    return false;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: messageText,
      parse_mode: 'HTML'
    });

    if (response.data.ok) {
      console.log('✅ ส่งข้อความเข้า Telegram เรียบร้อยแล้ว');
      return true;
    }
  } catch (error) {
    console.error('❌ ส่งข้อความเข้า Telegram ไม่สำเร็จ:', error.response?.data || error.message);
    return false;
  }
}

module.exports = { sendTelegramNotification };
