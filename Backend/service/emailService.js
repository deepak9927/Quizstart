// services/emailService.js
const nodemailer = require('nodemailer');

// Configure nodemailer with Gmail (or other free SMTP service)
const createTransporter = async () => {
  // For Gmail, you can use app passwords
  // https://support.google.com/accounts/answer/185833
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // or directly use SMTP settings
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD, // use app password for Gmail
    }
  });
  
  return transporter;
};

// Send email notification
exports.sendNotification = async (to, subject, body) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: body,
      html: `<p>${body}</p>`
    };

    const response = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    return error;
  }
};

// Alternative option: You can also add a function to use Ethereal for testing
exports.sendTestEmail = async (to, subject, body) => {
  try {
    // Create a test account at Ethereal for testing
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    const mailOptions = {
      from: testAccount.user,
      to,
      subject,
      text: body,
      html: `<p>${body}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent');
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return info;
  } catch (error) {
    console.error('Error sending test email:', error);
    return error;
  }
};