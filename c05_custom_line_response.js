// Input: Assume items[0].json contains the data as shown
const data = items[0].json;

const {
  replyToken,
  trackingId,
  senderName,
  receiverName,
  receiverAddress,
  pickupRider,
  deliveryRider,
  zone,
  status,
  warehouseAt,
  sortedAt,
  dispatchedAt,
  deliveredAt,
} = data;

const message = 
`📦 สถานะพัสดุ: ${status}
🔎 Tracking ID: ${trackingId}

👤 ผู้ส่ง: ${senderName}
📍 ผู้รับ: ${receiverName}
🏠 ที่อยู่: ${receiverAddress}

🛵 พนักงานรับพัสดุ: ${pickupRider}
🚚 พนักงานจัดส่ง: ${deliveryRider}
📌 พื้นที่จัดส่ง: ${zone}

🏬 เข้าคลัง: ${warehouseAt}
📦 คัดแยก: ${sortedAt}
📤 ออกจากคลัง: ${dispatchedAt}
✅ จัดส่งสำเร็จ: ${deliveredAt}`;

return {
    json: {
      replyToken: replyToken,
      messages: [
        {
          type: 'text',
          text: message,
        },
      ],
    },
  }

