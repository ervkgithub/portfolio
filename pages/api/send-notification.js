import nodemailer from 'nodemailer';

// Cache for page views to avoid duplicate notifications
const pageViewCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Get location from IP
async function getLocation(ip) {
  if (ip === '::1' || ip.startsWith('192.168') || ip === '127.0.0.1') {
    return { country: 'Local', city: 'Development' };
  }
  
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      isp: data.org || 'Unknown'
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    return { country: 'Unknown', city: 'Unknown' };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data = {} } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const timestamp = new Date().toLocaleString();
    
    // Skip page view notifications if we've seen this page recently
    if (type === 'page_view') {
      const cacheKey = `${ip}-${data.page || ''}`;
      if (pageViewCache.has(cacheKey)) {
        const lastSeen = pageViewCache.get(cacheKey);
        if (Date.now() - lastSeen < CACHE_TTL) {
          return res.status(200).json({ 
            success: true, 
            message: 'Page view already logged recently' 
          });
        }
      }
      pageViewCache.set(cacheKey, Date.now());
    }

    // Only fetch location for certain events to reduce API calls
    let location = {};
    if (['resume_download', 'contact', 'hire_me'].includes(type)) {
      location = await getLocation(ip);
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Format notification content based on event type
    let subject, text;
    const commonInfo = `\n\n---\nTime: ${timestamp}\nIP: ${ip}\nUser Agent: ${userAgent}\nPage: ${data.page || 'N/A'}\nReferrer: ${data.referrer || 'Direct visit'}`;
    
    switch (type) {
      case 'resume_download':
        subject = `📄 Resume Downloaded`;
        text = `Someone downloaded your resume!\n\n` +
               `Visitor Details:\n` +
               `- Name: ${data.name || 'Not provided'}\n` +
               `- Email: ${data.email || 'Not provided'}\n` +
               `- Location: ${location.city}, ${location.country}\n` +
               `- ISP: ${location.isp || 'Unknown'}` +
               commonInfo;
        break;

      case 'contact':
        subject = `📧 New Contact from ${data.name || 'a visitor'}`;
        text = `New contact form submission:\n\n` +
               `Name: ${data.name || 'Not provided'}\n` +
               `Email: ${data.email || 'Not provided'}\n` +
               `Subject: ${data.subject || 'No subject'}\n` +
               `Message: ${data.message || 'No message'}\n\n` +
               `Location: ${location.city}, ${location.country}\n` +
               `ISP: ${location.isp || 'Unknown'}` +
               commonInfo;
        break;

      case 'hire_me':
        subject = `💼 New Hire Request!`;
        text = `You have a new hire request!\n\n` +
               `From: ${data.name || 'Anonymous'}\n` +
               `Email: ${data.email || 'Not provided'}\n` +
               `Message: ${data.message || 'No additional message'}\n\n` +
               `Location: ${location.city}, ${location.country}\n` +
               `ISP: ${location.isp || 'Unknown'}` +
               commonInfo;
        break;

      case 'project_view':
        subject = `👀 Project Viewed: ${data.projectName || 'Unknown Project'}`;
        text = `Project: ${data.projectName || 'Unknown'}\n` +
               `URL: ${data.projectUrl || 'N/A'}\n` +
               `Time Spent: ${data.timeSpent || 'N/A'}` +
               commonInfo;
        break;

      case 'social_click':
        subject = `🔗 ${data.platform || 'Social Media'} Click`;
        text = `Platform: ${data.platform || 'Unknown'}\n` +
               `URL: ${data.url || 'N/A'}` +
               commonInfo;
        break;

      case 'about_view':
        subject = `👤 About Page Viewed`;
        text = `Someone is checking you out!\n` +
               `Time Spent: ${data.timeSpent || 'N/A'}` +
               commonInfo;
        break;

      default:
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid notification type' 
        });
    }

    // Only send email for non-page view events
    if (type !== 'page_view') {
      await transporter.sendMail({
        from: `"Portfolio Notifications" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `[Portfolio] ${subject}`,
        text: text,
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Notification processed successfully',
      type,
      location
    });

  } catch (error) {
    console.error('Notification error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    return res.status(500).json({ 
      success: false,
      error: 'Failed to process notification',
      message: error.message,
      ...(process.env.NODE_ENV === 'development' && {
        code: error.code
      })
    });
  }
}