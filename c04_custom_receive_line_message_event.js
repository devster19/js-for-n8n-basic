// Simple intent checker with tracking code detection
const inputData = $input.first().json.body;

// Handle LINE webhook events array
let message = '';
let replyToken = null;
let userId = null;

if (inputData.events && inputData.events.length > 0) {
  // LINE webhook format - loop through events
  const event = inputData.events[0]; // Take first event
  message = event.message?.text || '';
  replyToken = event.replyToken || null;
  userId = event.source?.userId || null;
} else {
  // Other webhook formats
  message = inputData.body?.message || 
           inputData.message || 
           inputData.text || 
           '';
  
  replyToken = inputData.replyToken || 
              inputData.body?.replyToken ||
              null;
  
  userId = inputData.userId || 
          inputData.body?.userId ||
          inputData.source?.userId ||
          null;
}

// Check for TX tracking code (with debugging and robust pattern)
const trackingPatterns = [
  /TX\d{3,}/i,           // Standard TX123
  /TX\s*\d{3,}/i,        // TX 123 (with space)
  /T\s*X\s*\d{3,}/i      // T X 123 (with spaces)
];

let trackingMatch = null;
let trackingCode = null;

// Try each pattern
for (const pattern of trackingPatterns) {
  trackingMatch = message.match(pattern);
  if (trackingMatch) {
    trackingCode = trackingMatch[0].replace(/\s/g, '').toUpperCase(); // Remove spaces
    break;
  }
}

// Debug info to help troubleshoot
console.log('Input data:', JSON.stringify(inputData, null, 2));
console.log('Message:', message);
console.log('Message length:', message.length);
console.log('Reply token:', replyToken);
console.log('User ID:', userId);
console.log('Tracking match:', trackingMatch);
console.log('Tracking code:', trackingCode);

// Simple intent detection
let intent = 'general';
if (trackingCode) {
  intent = 'tracking';
} else if (message.toLowerCase().includes('สวัสดี') || message.toLowerCase().includes('hello')) {
  intent = 'greeting';
} else if (message.toLowerCase().includes('ช่วย') || message.toLowerCase().includes('help')) {
  intent = 'help';
}

const results = {
  intent: intent,
  trackingCode: trackingCode,
  replyToken: replyToken,
  userId: userId,
  originalMessage: message
};

return [{ json: results }];