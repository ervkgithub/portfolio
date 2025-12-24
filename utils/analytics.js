// Log the pageview with their URL
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
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

// Specific event trackers
export const trackResumeDownload = () => {
  event({
    action: 'resume_download',
    category: 'engagement',
    label: 'Resume Downloaded',
  });};

export const trackHireMeClick = () => {
  event({
    action: 'hire_me_click',
    category: 'engagement',
    label: 'Hire Me Clicked',
  });};

export const trackContactSubmit = (formData) => {
  event({
    action: 'contact_submit',
    category: 'engagement',
    label: 'Contact Form Submitted',
    value: JSON.stringify(formData),
  });};

export const trackChatbotInteraction = (interactionType) => {
  event({
    action: 'chatbot_interaction',
    category: 'engagement',
    label: `Chatbot: ${interactionType}`,
  });};

export const trackProjectView = (projectName) => {
  event({
    action: 'project_view',
    category: 'engagement',
    label: `Project Viewed: ${projectName}`,
  });};
