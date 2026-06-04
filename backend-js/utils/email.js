const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Skip actual email sending in development if no SMTP configured
  if (process.env.NODE_ENV === 'development' && !process.env.SMTP_HOST) {
    console.log('📧 Email would be sent in production:', options);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || 'noreply@portfolio.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html
  };

  await transporter.sendMail(mailOptions);
};

const sendContactEmail = async (data) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0ea5e9; }
        .message { background: white; padding: 15px; border-radius: 5px; margin-top: 10px; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div>${data.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div>${data.email}</div>
          </div>
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div>${data.phone}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Subject:</div>
            <div>${data.subject}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This message was sent from your portfolio contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: process.env.SMTP_USER || 'admin@portfolio.com',
    subject: `Contact Form: ${data.subject}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\n${data.phone ? `Phone: ${data.phone}\n` : ''}Subject: ${data.subject}\n\nMessage:\n${data.message}`,
    html
  });
};

const sendWelcomeEmail = async (user) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9fafb; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #6b7280; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Welcome to Portfolio Platform!</h2>
        </div>
        <div class="content">
          <p>Dear ${user.firstName} ${user.lastName},</p>
          <p>Your account has been successfully created.</p>
          <p>You can now log in and start managing your portfolio.</p>
          <p>Best regards,<br>Portfolio Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Portfolio Platform. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: user.email,
    subject: 'Welcome to Portfolio Platform',
    text: `Welcome ${user.firstName}! Your account has been created.`,
    html
  });
};

module.exports = {
  sendEmail,
  sendContactEmail,
  sendWelcomeEmail
};