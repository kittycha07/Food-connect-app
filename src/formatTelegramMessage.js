/**
 * จัดรูปแบบข้อความแจ้งเตือนเมื่อเพิ่มร้านอาหารใหม่
 */
function formatNewRestaurantMsg(restaurant) {
  return `
<b>🍔 [food-connect] ร้านอาหารใหม่เพิ่มเข้าระบบ!</b>
----------------------------------------
<b>ชื่อร้าน:</b> ${restaurant.name}
<b>หมวดหมู่:</b> ${restaurant.category}
<b>เบอร์ติดต่อ:</b> ${restaurant.phone || 'ไม่ได้ระบุ'}
<b>สถานที่/พิกัด:</b> ${restaurant.location || 'ไม่ได้ระบุ'}
<b>คะแนนเริ่มต้น:</b> ⭐ ${restaurant.rating || 5.0}
----------------------------------------
<i>เปิดดูข้อมูลร้านได้ในแอป food-connect</i>
  `.trim();
}

/**
 * จัดรูปแบบข้อความแจ้งเตือนเมื่อมีคำสั่งซื้อใหม่
 */
function formatNewOrderMsg(order) {
  const itemsList = order.items ? order.items.map(item => `  • ${item}`).join('\n') : '  • ไม่ได้ระบุรายการ';
  return `
<b>🛒 [food-connect] มีคำสั่งซื้อใหม่!</b>
----------------------------------------
<b>รหัสออเดอร์:</b> #${order.id}
<b>ร้านอาหาร:</b> ${order.restaurantName}
<b>ลูกค้า:</b> ${order.customerName || 'ลูกค้าทั่วไป'}
<b>รายการอาหาร:</b>
${itemsList}
<b>ราคารวม:</b> ฿${order.totalPrice}
----------------------------------------
  `.trim();
}

module.exports = {
  formatNewRestaurantMsg,
  formatNewOrderMsg
};
