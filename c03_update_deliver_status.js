return $input.all().map(item => {
  return {
    json: {
      ...item.json,
      'status': "เจ้าหน้าที่กำลังนำส่งพัสดุ",
      'dispatchedAt': new Date().toISOString()
    }
  };
});