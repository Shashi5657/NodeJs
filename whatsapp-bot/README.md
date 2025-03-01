# WhatsApp Message Automation using Node.js

## Overview
This project automates WhatsApp messages using **Node.js**, **whatsapp-web.js**, and **puppeteer**. It sends a WhatsApp message every 5 minutes for 10 times.

---

## Features
✅ Automates WhatsApp messages on a schedule.
✅ Uses `whatsapp-web.js` to control WhatsApp Web.
✅ Saves authentication session using `LocalAuth` (no repeated QR scans).
✅ Runs locally without third-party APIs.

❌ Requires WhatsApp Web to remain open.
❌ May get blocked if overused (avoid spamming).

---

## Installation
### 1. Clone the Repository
```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
npm init -y  # Initialize package.json
npm install whatsapp-web.js puppeteer qrcode-terminal
```

---

## Script
### `whatsapp-bot.js`
```javascript
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("Scan this QR code in WhatsApp Web to authenticate:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("WhatsApp Bot is ready!");

  const contactNumber = "1234567890"; // Replace with recipient's number
  const message = "Hello! This is an automated message.";
  const chatId = contactNumber + "@c.us";

  for (let i = 0; i < 10; i++) {
    setTimeout(async () => {
      try {
        await client.sendMessage(chatId, `${message} (Message ${i + 1}/10)`);
        console.log(`Message ${i + 1} sent successfully.`);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }, i * 5 * 60 * 1000);
  }
});

client.initialize();
```

---

## How It Works
1. **Run the script:**
   ```bash
   node whatsapp-bot.js
   ```
2. **Scan the QR Code** from the terminal using your WhatsApp mobile app.
3. **Once authenticated**, the bot will send messages **every 5 minutes for 10 times**.
4. **Messages will stop after 10 iterations.**

---

## Code Breakdown
### 1. Importing Libraries
```javascript
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
```
- `Client`: Controls WhatsApp Web automation.
- `LocalAuth`: Saves authentication session.
- `qrcode-terminal`: Generates QR codes for authentication.

### 2. Creating a WhatsApp Client
```javascript
const client = new Client({
  authStrategy: new LocalAuth(),
});
```
- Initializes a WhatsApp client that stores login sessions locally.

### 3. QR Code Generation
```javascript
client.on("qr", (qr) => {
  console.log("Scan this QR code in WhatsApp Web to authenticate:");
  qrcode.generate(qr, { small: true });
});
```
- Displays a QR code in the terminal for authentication.

### 4. Bot Ready Event
```javascript
client.on("ready", async () => {
  console.log("WhatsApp Bot is ready!");
```
- Fires when WhatsApp Web is connected.

### 5. Sending Messages in a Loop
```javascript
for (let i = 0; i < 10; i++) {
  setTimeout(async () => {
    await client.sendMessage(chatId, `${message} (Message ${i + 1}/10)`);
  }, i * 5 * 60 * 1000);
}
```
- Sends 10 messages, each **5 minutes apart**.

### 6. Initializing the Client
```javascript
client.initialize();
```
- Starts the bot.

---

## Methods & Classes Used
| Class/Method | Functionality |
|-------------|--------------|
| `Client` | Main class to control WhatsApp Web |
| `LocalAuth` | Stores session data to avoid repeated QR scans |
| `client.on("qr", callback)` | Triggers when WhatsApp Web requests authentication |
| `client.on("ready", callback)` | Fires when the bot is ready to send messages |
| `qrcode.generate(qr, { small: true })` | Displays QR code in terminal |
| `client.sendMessage(chatId, message)` | Sends a WhatsApp message |
| `setTimeout(callback, delay)` | Delays execution for scheduled message sending |
| `try...catch` | Handles errors when sending messages |
| `client.initialize()` | Starts the WhatsApp bot |

---

## Enhancements
You can modify the script to:
- **Send messages to multiple contacts**
- **Use dynamic message content**
- **Log messages to a file**

Let me know if you need additional features! 🚀

