// utils/emailTemplates/resetPasswordTemplate.js

const resetPasswordTemplate = (name, resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #333;">🔐 Reset Your Password</h2>
      <p>Hello ${name || ""},</p>
      <p>We received a request to reset your password.</p>
      <p>
        <a href="${resetLink}" 
           style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">
          Click here to reset your password
        </a>
      </p>
      <p>If you didn't request this, please ignore this email.</p>
      <hr />
      <p style="font-size: 12px; color: gray;">This link will expire in 1 hour.</p>
    </div>
  `;
};

module.exports = resetPasswordTemplate;
