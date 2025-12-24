import { useCallback } from 'react';
import { 
  trackResumeDownload, 
  trackHireMeClick, 
  trackContactSubmit, 
  trackChatbotInteraction,
  trackProjectView
} from '../utils/analytics';

const useAnalytics = () => {
  const onResumeDownload = useCallback(() => {
    trackResumeDownload();
  }, []);

  const onHireMeClick = useCallback(() => {
    trackHireMeClick();
  }, []);

  const onContactSubmit = useCallback((formData) => {
    trackContactSubmit(formData);
  }, []);

  const onChatbotInteraction = useCallback((interactionType) => {
    trackChatbotInteraction(interactionType);
  }, []);

  const onProjectView = useCallback((projectName) => {
    trackProjectView(projectName);
  }, []);

  return {
    onResumeDownload,
    onHireMeClick,
    onContactSubmit,
    onChatbotInteraction,
    onProjectView,
  };
};

export default useAnalytics;
