axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
  chat_id: CHAT_ID,
  text: message,
  parse_mode: 'HTML' // 👈 สำคัญมาก ต้องมีบรรทัดนี้
});
