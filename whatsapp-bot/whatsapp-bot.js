//  Imports the whatsapp-web.js library, which helps control WhatsApp Web through automation.
//Client: The main class used to interact with WhatsApp Web.
// LocalAuth: Saves session data locally, so you don’t have to scan the QR code every time.
const { Client, LocalAuth } = require("whatsapp-web.js");

//Imports the qrcode-terminal package, which generates and displays QR codes directly in the terminal for authentication.
const qrcode = require("qrcode-terminal");

//Creates a new WhatsApp Client instance.
// authStrategy: new LocalAuth(): Uses LocalAuth to store session details, preventing frequent QR scans.
const client = new Client({
  authStrategy: new LocalAuth(),
});

//Listens for the qr event, which triggers when WhatsApp requires authentication.
client.on("qr", (qr) => {
  console.log("Scan this QR code in WhatsApp Web to authenticate:");
  // Generates a QR code in the terminal for the user to scan via WhatsApp Web.
  qrcode.generate(qr, { small: true });
});

// client.on("ready", callback): Listens for the ready event, which indicates that WhatsApp Web is fully connected and ready to send messages.
client.on("ready", async () => {
  console.log("WhatsApp Bot is ready!");

  const contactNumber = "9194407526222"; // Replace with the recipient's number
  const message = "Hello! whatsapp message"; // Message to send

  //chatId: WhatsApp identifies users via @c.us suffix. Example:
  // 1234567890@c.us (for personal contacts)
  const chatId = contactNumber + "@c.us";

  //Runs the loop 10 times
  for (let i = 0; i < 10; i++) {
    setTimeout(async () => {
      try {
        //Sends the WhatsApp message to the specified contact.
        await client.sendMessage(chatId, `${message} (Message ${i + 1}/2)`);
        console.log(`Message ${i + 1} sent successfully.`);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }, i * 5 * 60 * 1000); // 5 minutes interval
  }
});

//Starts the WhatsApp bot and listens for events (qr, ready, etc.).
client.initialize();
