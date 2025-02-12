const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Set up your email credentials
const transporter = nodemailer.createTransport({
  service: "gmail", // Or another email provider
  auth: {
    user: "bookstoreappflutter@gmail.com", // Your email
    pass: "apwx veth jlxg jgie",
  },
});

// Define the Cloud Function to send emails
exports.sendEmail = functions.https.onRequest(async (req, res) => {
  const {to, subject, text} = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send("Missing email parameters");
  }

  try {
    const mailOptions = {
      from: "bookstoreappflutter@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).send("Failed to send email");
  }
});
