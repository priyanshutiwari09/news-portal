const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async (to, subject, html) => {
  // console.log("📬 sendEmail() called for:", to); // Debug log

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // ✅ Recommended for STARTTLS
      secure: false, // ✅ Use STARTTLS (not SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 🔍 Verify transporter connection
    await transporter.verify();
    // console.log("✅ Gmail SMTP connection verified!");

    const mailOptions = {
      from: `"Last24 News" <${process.env.EMAIL_DUMMY}>`, // ✅ custom sender name
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("✅ Email sent successfully!");
    // console.log("📨 Server response:", info.response); // should include "250 OK"
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};

module.exports = sendEmail;
