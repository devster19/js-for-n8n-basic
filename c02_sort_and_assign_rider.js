return $input.all().map(item => {
  const address = item.json.receiverAddress || "";
  const zipcodeMatch = address.match(/\b(\d{5})\b/);
  const zipcode = zipcodeMatch ? zipcodeMatch[1] : "";
  let zone = "ไม่ระบุ";
  let deliveryRider = "ไม่ระบุ";
  if (/^10|11/.test(zipcode)) {
    zone = "กรุงเทพ";
    deliveryRider = "วิน";
  } else if (/^12|13/.test(zipcode)) {
    zone = "ปริมณฑล";
    deliveryRider = "ไทด์";
  } else if (/^5/.test(zipcode)) {
    zone = "ภาคเหนือ";
    deliveryRider = "พีท";
  } else if (/^9/.test(zipcode)) {
    zone = "ภาคใต้";
    deliveryRider = "ภูผา";
  } else if (/^4/.test(zipcode)) {
    zone = "อีสาน";
    deliveryRider = "ภูวินทร์";
  } else if (/^2/.test(zipcode)) {
    zone = "ตะวันออก";
    deliveryRider = "ทัพพ์";
  } else if (/^7/.test(zipcode)) {
    zone = "ตะวันตก";
    deliveryRider = "นที";
  }
  return {
    json: {
      ...item.json,
      'zone': zone,
      'deliverRider': deliveryRider,
      'status': "ทำการเตรียมจัดส่ง",
      'sortedAt': new Date().toISOString()
    }
  };
});