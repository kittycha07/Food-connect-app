const fetch = require('node-fetch');

/**
 * ฟังก์ชันสำหรับส่งข้อความไปยัง Telegram Chat / Channel
 * @param {string} messageText - ข้อความที่จะส่ง (รองรับ HTML tags)
 * @returns {Promise<boolean>} Status ความสำเร็จ
 */
async function sendTelegramNotification(messageText) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram Bot Token or Chat ID is missing in .env file!');
    return false;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Telegram API Error:', data.description);
    }
    return data.ok;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
}

module.exports = { sendTelegramNotification };
