import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abishekkhadka36@gmail.com", // your email
    pass: "lkxd xlmk fcmu qyej", // NOT your normal password (see note below)
  },
});

// Email options
const mailOptions = {
  from: "citc@ncit.edu.np",
  to: "abishek.231303@ncit.edu.np",
  subject: "Test Email from JavaScript",
  text: "Hello! This email was sent using JavaScript (Node.js).",
  // html: "<h1>Hello</h1><p>This is a test email</p>"  // optional
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Email sent:", info.response);
  }
});
