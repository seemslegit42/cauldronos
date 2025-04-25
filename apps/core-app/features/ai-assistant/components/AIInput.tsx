import React, { useState } from 'react';
import { Sender } from '@ant-design/x';
import { VoiceInput } from './VoiceInput';
import { useAIAssistantStore } from '../store/aiAssistantStore';

interface AIInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const AIInput: React.FC<AIInputProps> = ({ onSend, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const { isSpeechInputActive, setSpeechInputActive } = useAIAssistantStore();
  
  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
  };
  
  const handleVoiceTranscript = (transcript: string) => {
    if (transcript.trim()) {
      onSend(transcript);
    }
  };
  
  return (
    <div className="ai-input-container">
      <Sender
        value={inputValue}
        onChange={(value) => setInputValue(value)}
        onSubmit={handleSend}
        loading={isLoading}
        disabled={isLoading || isSpeechInputActive}
        allowSpeech={false} // We'll use our custom voice input
        actions={(defaultActions) => (
          <>
            {defaultActions}
            <VoiceInput
              onTranscript={handleVoiceTranscript}
              isActive={isSpeechInputActive}
              setIsActive={setSpeechInputActive}
            />
          </>
        )}
        placeholder="Ask me anything..."
        autoSize={{ minRows: 1, maxRows: 4 }}
      />
    </div>
  );
};
