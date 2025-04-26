import { useState, useEffect, useCallback } from 'react';
import { createSpeechRecognition, isSpeechRecognitionSupported } from '../utils/speechUtils';

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onEnd: () => void;
  language?: string;
}

export const useSpeechRecognition = ({
  onResult,
  onEnd,
  language = 'en-US',
}: UseSpeechRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const recognitionInstance = createSpeechRecognition();
      
      if (recognitionInstance) {
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = language;
        
        recognitionInstance.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          setTranscript(transcript);
          onResult(transcript);
        };
        
        recognitionInstance.onend = () => {
          setIsListening(false);
          onEnd();
        };
        
        setRecognition(recognitionInstance);
      }
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onResult, onEnd, language]);

  const startListening = useCallback(() => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
        setTranscript('');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasSupport: isSpeechRecognitionSupported(),
  };
};
