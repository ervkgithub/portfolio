import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, data } = req.body;
  const userAgent = req.headers['user-agent'];
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let subject, text;
    const timestamp = new Date().toLocaleString();
    
    const commonInfo = `\n\n---\nTime: ${timestamp}\nIP: ${ip}\nUser Agent: ${userAgent}`;

    switch (type) {
      case 'resume_download':
        subject = `✅ Resume Downloaded`;
        text = `Someone downloaded your resume!\n\nLocation: ${data.location || 'Unknown'}${commonInfo}`;
        break;
        
      case 'contact':
        subject = `📧 New Contact Form Submission from ${data.name || 'a visitor'}`;
        text = `Name: ${data.name || 'Not provided'}\n` +
               `Email: ${data.email || 'Not provided'}\n` +
               `Subject: ${data.subject || 'No subject'}\n` +
               `Message: ${data.message || 'No message'}` + 
               commonInfo;
        break;
        
      case 'hire_me':
        subject = `💼 New Hire Request!`;
        text = `Name: ${data.name || 'Not provided'}\n` +
               `Email: ${data.email || 'Not provided'}\n` +
               `Message: ${data.message || 'No additional message'}` +
               commonInfo;
        break;
        
      case 'social_click':
        subject = `🔗 Social Media Click`;
        text = `Platform: ${data.platform || 'Unknown'}\n` +
               `URL: ${data.url || 'Not provided'}` +
               commonInfo;
        break;
        
      case 'page_view':
        subject = `🌐 Page Viewed`;
        text = `Page: ${data.page || 'Unknown'}\n` +
               `Referrer: ${data.referrer || 'Direct visit'}` +
               commonInfo;
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid notification type' });
    }

    await transporter.sendMail({
      from: `"Portfolio Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `[Portfolio] ${subject}`,
      text: text,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
}
