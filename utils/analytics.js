// Log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-SP3KYDLGPD', {
      page_path: url,
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
export const trackResumeDownload = () => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: 'Resume Downloaded',
  });
};

// Contact Form
export const trackContactSubmit = (formData) => {
  event({
    action: 'form_submit',
    category: 'engagement',
    label: 'Contact Form Submitted',
    value: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
    }),
  });
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
export const trackSocialClick = (platform) => {
  event({
    action: 'social_click',
    category: 'engagement',
    label: `Social: ${platform}`,
  });
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
export const trackHireMeClick = (location) => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: `Hire Me: ${location}`,
  });
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
