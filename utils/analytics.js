// Send notification to API
const sendNotification = async (type, data = {}) => {
  try {
    await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data: {
          ...data,
          page: typeof window !== 'undefined' ? window.location.pathname : '',
          referrer: document.referrer || 'Direct visit',
        },
      }),
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined') {
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('config', 'G-SP3KYDLGPD', {
        page_path: url,
      });
    }
    
    // Send notification
    sendNotification('page_view', {
      page: url,
      referrer: document.referrer || 'Direct visit',
    });
  }
};

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

// Hire Me Button
export const trackHireMeClick = (location = 'unknown') => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: `Hire Me: ${location}`,
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
