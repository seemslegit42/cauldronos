import React, { useState } from 'react';
import { Button } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  onTranscript,
  isActive,
  setIsActive
}) => {
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening, 
    hasSupport 
  } = useSpeechRecognition({
    onResult: (text) => {
      // This will be called continuously as the user speaks
    },
    onEnd: () => {
      if (transcript) {
        onTranscript(transcript);
      }
      setIsActive(false);
    }
  });
  
  const handleToggle = () => {
    if (isListening) {
      stopListening();
      setIsActive(false);
      if (transcript) {
        onTranscript(transcript);
      }
    } else {
      startListening();
      setIsActive(true);
    }
  };
  
  if (!hasSupport) {
    return null;
  }
  
  return (
    <div className="voice-input-container">
      <Button
        type="primary"
        shape="circle"
        icon={isListening ? <AudioOutlined /> : <AudioMutedOutlined />}
        onClick={handleToggle}
        className={isListening ? 'recording' : ''}
      />
      
      <AnimatePresence>
        {isListening && (
          <motion.div 
            className="recording-indicator"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="recording-waves">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="wave"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
            <div className="transcript">{transcript}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
