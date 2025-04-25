// Type definitions for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Check if speech recognition is supported
export const isSpeechRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && 
    (window.SpeechRecognition || window.webkitSpeechRecognition);
};

// Create a speech recognition instance
export const createSpeechRecognition = (): SpeechRecognition | null => {
  if (!isSpeechRecognitionSupported()) {
    return null;
  }
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return new SpeechRecognition();
};
