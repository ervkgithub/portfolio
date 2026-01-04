import nodemailer from 'nodemailer';

// Cache for page views to avoid duplicate notifications
const pageViewCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Get location from IP
async function getLocation(ip) {
  if (!ip || ip === '::1' || ip.startsWith('192.168') || ip === '127.0.0.1') {
    return { country: 'Local', city: 'Development' };
  }
  
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) {
      throw new Error(`IP API responded with status ${response.status}`);
    }
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
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  try {
    // Validate content type
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Content-Type must be application/json' 
      });
    }

    // Parse and validate request body
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch (e) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid JSON in request body' 
      });
    }

    const { type, data = {} } = body;
    
    if (!type) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required field: type' 
      });
    }

    const receivedType = type;
    const normalizedType = String(type).toLowerCase().trim();
    const typeAliases = {
      pageview: 'page_view',
      'page-view': 'page_view',
      'page view': 'page_view',
      resumedownload: 'resume_download',
      'resume-download': 'resume_download',
      hireme: 'hire_me',
      'hire-me': 'hire_me',
      socialclick: 'social_click',
      'social-click': 'social_click',
      projectview: 'project_view',
      'project-view': 'project_view',
      aboutview: 'about_view',
      'about-view': 'about_view',
    };

    const notificationType = typeAliases[normalizedType] || normalizedType;

    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
               req.socket?.remoteAddress || 
               'unknown';
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const timestamp = new Date().toLocaleString();
    
    // Skip page view notifications if we've seen this page recently
    if (notificationType === 'page_view') {
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
    if (['resume_download', 'contact', 'hire_me'].includes(notificationType)) {
      try {
        location = await getLocation(ip);
      } catch (error) {
        console.error('Error getting location:', error);
        // Continue without location data if there's an error
      }
    }

    // Format notification content based on event type
    let subject, text;
    const commonInfo = `\n\n---\nTime: ${timestamp}\nIP: ${ip}\nUser Agent: ${userAgent}\nPage: ${data.page || 'N/A'}\nReferrer: ${data.referrer || 'Direct visit'}`;
    
    switch (notificationType) {
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
        if (!data.name || !data.email || !data.message) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields for contact form',
            required: ['name', 'email', 'message']
          });
        }
        subject = `📧 New Contact from ${data.name}`;
        text = `New contact form submission:\n\n` +
               `Name: ${data.name}\n` +
               `Email: ${data.email}\n` +
               `Subject: ${data.subject || 'No subject'}\n` +
               `Message: ${data.message}\n\n` +
               `Location: ${location.city}, ${location.country}\n` +
               `ISP: ${location.isp || 'Unknown'}` +
               commonInfo;
        break;

      case 'hire_me':
        if (!data.name || !data.email) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields for hire request',
            required: ['name', 'email']
          });
        }
        subject = `💼 New Hire Request!`;
        text = `You have a new hire request!\n\n` +
               `From: ${data.name}\n` +
               `Email: ${data.email}\n` +
               `Message: ${data.message || 'No additional message'}\n\n` +
               `Location: ${location.city}, ${location.country}\n` +
               `ISP: ${location.isp || 'Unknown'}` +
               commonInfo;
        break;

      case 'project_view':
        if (!data.projectName) {
          return res.status(400).json({
            success: false,
            error: 'Missing required field: projectName'
          });
        }
        subject = `👀 Project Viewed: ${data.projectName}`;
        text = `Project: ${data.projectName}\n` +
               `URL: ${data.projectUrl || 'N/A'}\n` +
               `Time Spent: ${data.timeSpent || 'N/A'}` +
               commonInfo;
        break;

      case 'social_click':
        if (!data.platform) {
          return res.status(400).json({
            success: false,
            error: 'Missing required field: platform'
          });
        }
        subject = `🔗 ${data.platform} Click`;
        text = `Platform: ${data.platform}\n` +
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
          error: 'Invalid notification type',
          receivedType,
          validTypes: [
            'page_view', 
            'resume_download', 
            'contact', 
            'hire_me', 
            'project_view', 
            'social_click', 
            'about_view'
          ]
        });
    }

    // Only send email for non-page view events
    if (notificationType !== 'page_view') {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: process.env.EMAIL_PORT || 465,
          secure: process.env.EMAIL_SECURE !== 'false',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        });

        await transporter.sendMail({
          from: `"Portfolio Notifications" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: `[Portfolio] ${subject}`,
          text: text,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request if email sending fails
      }
    }

    return res.status(200).json({ 
      success: true,
      message: 'Notification processed successfully',
      type: notificationType,
      ...(Object.keys(location).length > 0 && { location })
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
        code: error.code,
        stack: error.stack
      })
    });
  }
}