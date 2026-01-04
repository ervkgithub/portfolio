// Send notification to API
// utils/analytics.js

// Send notification to API
const sendNotification = async (type, data = {}) => {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type, // This will be 'page_view', 'contact', etc.
        data: {
          ...data,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          referrer: document.referrer || 'Direct visit',
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Notification API error:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);
    return false;
  }
};

// Update pageview function to include proper type
export const pageview = (url) => {
  if (typeof window !== 'undefined') {
    const GA_MEASUREMENT_ID =
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
      process.env.NEXT_PUBLIC_GA_ID ||
      'G-SP3KYDLGPD';

    // Track in Google Analytics
    if (window.gtag && GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
    
    // Send notification with proper type
    sendNotification('page_view', {
      page: url,
      referrer: document.referrer || 'Direct visit',
      timestamp: new Date().toISOString()
    }).catch(error => {
      console.error('Error in pageview tracking:', error);
    });
  }
};

// ... rest of your analytics.js code remains the same ...


// Log specific events
const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// ===== CTA TRACKING =====

// Resume Download
export const trackResumeDownload = (location = 'unknown') => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: 'Resume Downloaded',
  });
  
  if (typeof window !== 'undefined') {
    sendNotification('resume_download', {
      location: location,
      filename: 'Vijay-Resume.pdf'
    });
  }
};

// Contact Form
export const trackContactSubmit = (formData) => {
  const formDataToTrack = {
    name: formData.name || 'Not provided',
    email: formData.email || 'Not provided',
    subject: formData.subject || 'No subject',
    message: formData.message || 'No message'
  };
  
  event({
    action: 'form_submit',
    category: 'engagement',
    label: 'Contact Form Submitted',
    value: JSON.stringify(formDataToTrack),
  });
  
  if (typeof window !== 'undefined') {
    sendNotification('contact', formDataToTrack);
  }
};

// Project Interactions
export const trackProjectClick = (projectName) => {
  event({
    action: 'project_click',
    category: 'engagement',
    label: `Project Clicked: ${projectName}`,
  });
};

export const trackProjectView = (projectName) => {
  event({
    action: 'project_view',
    category: 'engagement',
    label: `Project Viewed: ${projectName}`,
  });
};

// Navigation
export const trackNavClick = (section) => {
  event({
    action: 'nav_click',
    category: 'navigation',
    label: `Nav: ${section}`,
  });
};

// Social Media
export const trackSocialClick = (platform, url = '') => {
  event({
    action: 'social_click',
    category: 'engagement',
    label: `Social: ${platform}`,
  });
  
  if (typeof window !== 'undefined') {
    sendNotification('social_click', {
      platform: platform,
      url: url
    });
  }
};

// Email Click
export const trackEmailClick = (emailType = 'primary') => {
  event({
    action: 'email_click',
    category: 'engagement',
    label: `Email: ${emailType}`,
  });
};

// Hire Vijay Button
export const trackHireMeClick = (location = 'unknown') => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: `Hire Vijay: ${location}`,
  });
  
  if (typeof window !== 'undefined') {
    sendNotification('hire_me', {
      location: location,
      page: window.location.pathname
    });
  }
};

// Chatbot
export const trackChatbotInteraction = (interactionType) => {
  event({
    action: 'chatbot_interaction',
    category: 'engagement',
    label: `Chatbot: ${interactionType}`,
  });
};

// File Download
export const trackFileDownload = (fileName) => {
  event({
    action: 'file_download',
    category: 'engagement',
    label: `File Downloaded: ${fileName}`,
  });
};
