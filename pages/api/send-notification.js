import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;
    
    // Log environment status for debugging
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not Set',
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set'
    });

    // Use the same transport as your working send-email.js
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    let subject, text;
    const timestamp = new Date().toLocaleString();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    const commonInfo = `\n\n---\nTime: ${timestamp}\nIP: ${ip}\nUser Agent: ${userAgent}\nPage: ${data?.page || 'Unknown'}\nReferrer: ${data?.referrer || 'Direct visit'}`;

    // ... rest of your existing switch case for subject and text ...

    const info = await transporter.sendMail({
      from: `"Portfolio Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      text: text,
    });

    console.log('Message sent: %s', info.messageId);

    return res.status(200).json({ 
      success: true,
      message: 'Notification sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    return res.status(500).json({ 
      success: false,
      error: 'Failed to send notification',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        code: error.code
      })
    });
  }
}