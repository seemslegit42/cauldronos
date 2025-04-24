import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, FormProps, Select, DatePicker, Space, Tooltip, Card, Alert, Progress, Badge, Popover, Typography, Divider, Tag } from 'antd';
import {
  InfoCircleOutlined,
  BulbOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  LoadingOutlined,
  AudioOutlined,
  SendOutlined,
  StarOutlined,
  StarFilled,
  MessageOutlined,
  FileTextOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../theme';
import { transitions } from '../../animations/transitions';
import { 
  Bubble, 
  ThoughtChain, 
  Prompts, 
  AIChat, 
  Insight, 
  Suggestions, 
  AIAssistant, 
  ThoughtProcess,
  FieldHistory,
  SmartRecommendations,
  ImportanceIndicator
} from '@ant-design/x';
import { 
  AnimatedInput as Input, 
  AnimatedButton as Button, 
  AnimatedCard, 
  AnimatedForm,
  AnimatedAlert,
  AnimatedProgress,
  AnimatedTag,
  AnimatedTooltip,
  AnimatedBadge,
  AnimatedDivider
} from '@ant-design/move';

const { Text, Title, Paragraph } = Typography;

export interface EnhancedPredictiveFormProps extends FormProps {
  /**
   * Learning mode for the form
   * - passive: Only suggests based on patterns
   * - active: Learns from user input and adapts
   * - aggressive: Automatically applies suggestions
   * @default "passive"
   */
  learningMode?: 'passive' | 'active' | 'aggressive';

  /**
   * Context ID for the form to associate learning with specific forms
   */
  contextId?: string;

  /**
   * Whether to show suggestions
   * @default true
   */
  showSuggestions?: boolean;

  /**
   * Whether to show insights about the form data
   * @default false
   */
  showInsights?: boolean;

  /**
   * Whether to auto-validate fields as user types
   * @default true
   */
  autoValidate?: boolean;

  /**
   * Whether to show smart defaults
   * @default true
   */
  smartDefaults?: boolean;

  /**
   * Custom suggestion handler
   */
  onSuggestion?: (fieldName: string, value: any) => void;

  /**
   * Callback when AI completes the form
   */
  onAIComplete?: (values: Record<string, any>) => Promise<Record<string, any>>;

  /**
   * Callback when AI validates the form
   */
  onAIValidate?: (values: Record<string, any>) => Promise<{ valid: boolean; issues?: string[] }>;

  /**
   * Whether to show the AI completion button
   * @default true
   */
  showAICompletion?: boolean;

  /**
   * Whether to show the AI validation button
   * @default true
   */
  showAIValidation?: boolean;

  /**
   * Whether to show the form completion progress
   * @default true
   */
  showCompletionProgress?: boolean;

  /**
   * Whether to apply cyberpunk styling
   * @default false
   */
  cyberpunk?: boolean;

  /**
   * AI model to use for suggestions and completion
   * @default "default"
   */
  aiModel?: string;

  /**
   * Field dependencies for smart suggestions
   * Example: { city: ['country', 'state'], zipCode: ['city'] }
   */
  fieldDependencies?: Record<string, string[]>;

  /**
   * Whether to show the AI thought process
   * @default false
   */
  showThoughtProcess?: boolean;

  /**
   * Whether to show field history
   * @default false
   */
  showFieldHistory?: boolean;

  /**
   * Whether to show voice input option
   * @default false
   */
  enableVoiceInput?: boolean;

  /**
   * Whether to show field recommendations
   * @default true
   */
  showRecommendations?: boolean;

  /**
   * Whether to show the AI chat interface for form assistance
   * @default false
   */
  showAIChat?: boolean;

  /**
   * Predefined prompts for the form
   */
  predefinedPrompts?: Array<{
    key: string;
    label: React.ReactNode;
    description: string;
  }>;

  /**
   * Callback when user selects a predefined prompt
   */
  onPromptSelect?: (promptKey: string) => void;

  /**
   * Whether to show field importance indicators
   * @default false
   */
  showFieldImportance?: boolean;

  /**
   * Field importance ratings
   * Example: { name: 'high', email: 'medium', phone: 'low' }
   */
  fieldImportance?: Record<string, 'high' | 'medium' | 'low'>;
}

/**
 * EnhancedPredictiveForm component
 *
 * An AI-enhanced form component that provides intelligent features like
 * smart defaults, suggestions, auto-validation, insights, and thought processes.
 * Built with Ant Design X for a more interactive and intelligent form experience.
 */
export const EnhancedPredictiveForm: React.FC<EnhancedPredictiveFormProps> = ({
  children,
  learningMode = 'passive',
  contextId,
  showSuggestions = true,
  showInsights = false,
  autoValidate = true,
  smartDefaults = true,
  onSuggestion,
  form,
  initialValues,
  onAIComplete,
  onAIValidate,
  showAICompletion = true,
  showAIValidation = true,
  showCompletionProgress = true,
  cyberpunk = false,
  aiModel = 'default',
  fieldDependencies = {},
  showThoughtProcess = false,
  showFieldHistory = false,
  enableVoiceInput = false,
  showRecommendations = true,
  showAIChat = false,
  predefinedPrompts = [],
  onPromptSelect,
  showFieldImportance = false,
  fieldImportance = {},
  ...props
}) => {
  const [formInstance] = Form.useForm(form);
  const { token } = useTheme();
  const [suggestions, setSuggestions] = useState<Record<string, any>>({});
  const [insights, setInsights] = useState<string[]>([]);
  const [showInsightsPanel, setShowInsightsPanel] = useState(false);
  const [isAICompleting, setIsAICompleting] = useState(false);
  const [isAIValidating, setIsAIValidating] = useState(false);
  const [validationIssues, setValidationIssues] = useState<string[]>([]);
  const [showValidationIssues, setShowValidationIssues] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);
  const [fieldStatus, setFieldStatus] = useState<Record<string, 'empty' | 'partial' | 'complete'>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [showThoughts, setShowThoughts] = useState(false);
  const [thoughtChain, setThoughtChain] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ content: string; role: 'user' | 'ai' }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [fieldRecommendations, setFieldRecommendations] = useState<Record<string, string[]>>({});
  const [fieldHistory, setFieldHistory] = useState<Record<string, string[]>>({});
  const [activeField, setActiveField] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize form with smart defaults if enabled
  useEffect(() => {
    if (smartDefaults && contextId) {
      // In a real implementation, this would fetch learned defaults from a service
      // For demo, just set some mock defaults if initialValues aren't provided
      const mockDefaults = getMockDefaults(contextId);
      if (!initialValues && Object.keys(mockDefaults).length > 0) {
        formInstance.setFieldsValue(mockDefaults);
      }
    }
  }, [smartDefaults, contextId, formInstance, initialValues]);

  // Generate insights when form values change
  useEffect(() => {
    if (showInsights) {
      const currentValues = formInstance.getFieldsValue(true);
      const newInsights = generateInsights(currentValues, contextId);
      setInsights(newInsights);
    }
  }, [showInsights, formInstance, contextId]);

  // Generate field recommendations
  useEffect(() => {
    if (showRecommendations) {
      const mockRecommendations = getMockRecommendations();
      setFieldRecommendations(mockRecommendations);
    }
  }, [showRecommendations]);

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Mock function to get defaults based on context
  const getMockDefaults = (contextId: string) => {
    // In a real implementation, this would come from a learning system
    const defaults: Record<string, any> = {};

    if (contextId === 'user-profile') {
      defaults.country = 'United States';
      defaults.language = 'English';
      defaults.timezone = 'America/New_York';
    } else if (contextId === 'payment-form') {
      defaults.currency = 'USD';
      defaults.paymentMethod = 'credit-card';
    } else if (contextId === 'content-preferences') {
      defaults.theme = 'dark';
      defaults.notifications = true;
    }

    return defaults;
  };

  // Mock function to get field recommendations
  const getMockRecommendations = () => {
    // In a real implementation, this would come from a learning system
    const recommendations: Record<string, string[]> = {
      name: ['John Smith', 'Jane Doe', 'Alex Johnson'],
      email: ['user@example.com', 'contact@company.com', 'info@business.org'],
      phone: ['(555) 123-4567', '555-987-6543', '(123) 456-7890'],
      country: ['United States', 'Canada', 'United Kingdom', 'Australia'],
      state: ['California', 'New York', 'Texas', 'Florida'],
      city: ['San Francisco', 'New York City', 'Austin', 'Miami'],
    };

    return recommendations;
  };

  // Mock function to generate field suggestions
  const generateSuggestion = (fieldName: string, currentValue: any) => {
    // In a real implementation, this would use ML to generate suggestions
    if (fieldName === 'email' && typeof currentValue === 'string') {
      if (currentValue.includes('@') && !currentValue.includes('.')) {
        return `${currentValue}com`;
      }
    } else if (fieldName === 'name' && typeof currentValue === 'string') {
      if (currentValue.toLowerCase() === 'j') {
        return 'John';
      } else if (currentValue.toLowerCase() === 'm') {
        return 'Maria';
      }
    } else if (fieldName === 'phone' && typeof currentValue === 'string') {
      if (currentValue.length === 3) {
        return `${currentValue}-`;
      } else if (currentValue.length === 7) {
        return `${currentValue}-`;
      }
    }

    return null;
  };

  // Mock function to generate insights
  const generateInsights = (values: Record<string, any>, contextId?: string) => {
    // In a real implementation, this would use ML to generate insights
    const newInsights: string[] = [];

    if (Object.keys(values).length > 0) {
      if (values.email && !values.email.includes('@')) {
        newInsights.push('Email address is missing the @ symbol');
      }

      if (values.password && values.password.length < 8) {
        newInsights.push('Consider using a stronger password (at least 8 characters)');
      }

      if (values.name && values.name.split(' ').length < 2) {
        newInsights.push('Consider providing your full name');
      }

      if (contextId === 'user-profile' && !values.phone) {
        newInsights.push('Adding a phone number improves account security');
      }

      if (contextId === 'payment-form' && values.savePaymentInfo) {
        newInsights.push('Your payment information will be securely stored for future purchases');
      }
    }

    return newInsights;
  };

  // Handle field value changes
  const handleValuesChange = (changedValues: Record<string, any>) => {
    if (showSuggestions) {
      const fieldName = Object.keys(changedValues)[0];
      const currentValue = changedValues[fieldName];

      // Update field history
      if (showFieldHistory && currentValue) {
        setFieldHistory(prev => {
          const fieldHistoryArray = prev[fieldName] || [];
          if (typeof currentValue === 'string' && currentValue.trim() && !fieldHistoryArray.includes(currentValue)) {
            return {
              ...prev,
              [fieldName]: [...fieldHistoryArray, currentValue].slice(-5) // Keep last 5 entries
            };
          }
          return prev;
        });
      }

      const suggestion = generateSuggestion(fieldName, currentValue);
      if (suggestion) {
        setSuggestions(prev => ({
          ...prev,
          [fieldName]: suggestion
        }));

        if (onSuggestion) {
          onSuggestion(fieldName, suggestion);
        }
      } else {
        setSuggestions(prev => {
          const newSuggestions = { ...prev };
          delete newSuggestions[fieldName];
          return newSuggestions;
        });
      }
    }

    // Call the original onValuesChange if provided
    if (props.onValuesChange) {
      props.onValuesChange(changedValues, formInstance.getFieldsValue(true));
    }
  };

  // Apply a suggestion to the form
  const applySuggestion = (fieldName: string, value: any) => {
    formInstance.setFieldValue(fieldName, value);
    setSuggestions(prev => {
      const newSuggestions = { ...prev };
      delete newSuggestions[fieldName];
      return newSuggestions;
    });

    // Update field status
    updateFieldStatus(fieldName, value);
  };

  // Update field status based on value
  const updateFieldStatus = useCallback((fieldName: string, value: any) => {
    let status: 'empty' | 'partial' | 'complete' = 'empty';

    if (value !== undefined && value !== null && value !== '') {
      if (typeof value === 'string') {
        status = value.length > 3 ? 'complete' : 'partial';
      } else if (typeof value === 'object' && Object.keys(value).length > 0) {
        status = 'complete';
      } else {
        status = 'complete';
      }
    }

    setFieldStatus(prev => ({
      ...prev,
      [fieldName]: status
    }));
  }, []);

  // Calculate form completion progress
  useEffect(() => {
    if (showCompletionProgress) {
      const values = formInstance.getFieldsValue(true);
      const fieldNames = Object.keys(values);

      if (fieldNames.length === 0) return;

      let completedFields = 0;
      let partialFields = 0;

      fieldNames.forEach(fieldName => {
        const value = values[fieldName];
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'string' && value.length <= 3) {
            partialFields += 1;
          } else {
            completedFields += 1;
          }
        }

        // Update field status
        updateFieldStatus(fieldName, value);
      });

      const progress = Math.round(((completedFields + (partialFields * 0.5)) / fieldNames.length) * 100);
      setCompletionProgress(progress);
    }
  }, [formInstance, showCompletionProgress, updateFieldStatus]);

  // Handle AI form completion
  const handleAIComplete = async () => {
    if (!onAIComplete) return;

    setIsAICompleting(true);
    
    // Show thought process if enabled
    if (showThoughtProcess) {
      setShowThoughts(true);
      setThoughtChain([
        "Analyzing current form values...",
        "Identifying missing fields...",
        "Checking field dependencies...",
        "Generating appropriate values based on context..."
      ]);
    }

    try {
      const currentValues = formInstance.getFieldsValue(true);

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setCompletionProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 10);
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 300);

      // Call the AI completion handler
      const completedValues = await onAIComplete(currentValues);

      // Clear the progress interval
      clearInterval(progressInterval);

      // Update the form with the completed values
      formInstance.setFieldsValue(completedValues);

      // Update field status for all fields
      Object.entries(completedValues).forEach(([fieldName, value]) => {
        updateFieldStatus(fieldName, value);
      });

      // Set completion progress to 100%
      setCompletionProgress(100);

      // Generate insights based on the completed form
      if (showInsights) {
        const newInsights = generateInsights(completedValues, contextId);
        setInsights(newInsights);
        setShowInsightsPanel(true);
      }

      // Add final thought if thought process is enabled
      if (showThoughtProcess) {
        setThoughtChain(prev => [...prev, "Form completion successful!"]);
      }
    } catch (error) {
      console.error('Error completing form with AI:', error);
      
      // Add error thought if thought process is enabled
      if (showThoughtProcess) {
        setThoughtChain(prev => [...prev, "Error occurred during form completion."]);
      }
    } finally {
      setIsAICompleting(false);
    }
  };

  // Handle AI form validation
  const handleAIValidate = async () => {
    if (!onAIValidate) return;

    setIsAIValidating(true);
    setValidationIssues([]);
    
    // Show thought process if enabled
    if (showThoughtProcess) {
      setShowThoughts(true);
      setThoughtChain([
        "Analyzing form values for validation...",
        "Checking field formats and requirements...",
        "Verifying logical consistency between fields...",
        "Applying domain-specific validation rules..."
      ]);
    }

    try {
      const currentValues = formInstance.getFieldsValue(true);

      // Call the AI validation handler
      const result = await onAIValidate(currentValues);

      if (!result.valid && result.issues && result.issues.length > 0) {
        setValidationIssues(result.issues);
        setShowValidationIssues(true);
        
        // Add validation issues to thought chain
        if (showThoughtProcess) {
          setThoughtChain(prev => [
            ...prev, 
            "Validation issues found:",
            ...result.issues.map(issue => `- ${issue}`)
          ]);
        }
      } else {
        // Show success message
        setValidationIssues(['Form validation passed successfully!']);
        setShowValidationIssues(true);
        
        // Add success thought
        if (showThoughtProcess) {
          setThoughtChain(prev => [...prev, "Validation completed successfully. No issues found."]);
        }
      }
    } catch (error) {
      console.error('Error validating form with AI:', error);
      setValidationIssues(['An error occurred during validation.']);
      setShowValidationIssues(true);
      
      // Add error thought
      if (showThoughtProcess) {
        setThoughtChain(prev => [...prev, "Error occurred during validation."]);
      }
    } finally {
      setIsAIValidating(false);
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join('');

      if (activeField) {
        formInstance.setFieldValue(activeField, transcript);
        updateFieldStatus(activeField, transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Handle chat input submission
  const handleChatSubmit = () => {
    if (!chatInput.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, { content: chatInput, role: 'user' }]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'll help you with that. ";
      
      if (chatInput.toLowerCase().includes('fill')) {
        response += "I can fill out the form for you. Just click the 'AI Complete' button.";
      } else if (chatInput.toLowerCase().includes('validate')) {
        response += "I can validate your form entries. Click the 'AI Validate' button when you're ready.";
      } else if (chatInput.toLowerCase().includes('help')) {
        response += "I'm here to help you complete this form. You can ask me specific questions about fields or use the AI buttons to automate form completion and validation.";
      } else {
        response += "Is there anything specific you'd like help with on this form?";
      }
      
      setChatMessages(prev => [...prev, { content: response, role: 'ai' }]);
    }, 1000);
    
    // Clear input
    setChatInput('');
  };

  // Handle prompt selection
  const handlePromptSelect = (promptKey: string) => {
    if (onPromptSelect) {
      onPromptSelect(promptKey);
    }
    
    // Add prompt to chat if chat is enabled
    if (showAIChat) {
      const selectedPrompt = predefinedPrompts.find(p => p.key === promptKey);
      if (selectedPrompt) {
        setChatMessages(prev => [...prev, { content: selectedPrompt.description, role: 'user' }]);
        
        // Simulate AI response
        setTimeout(() => {
          setChatMessages(prev => [...prev, { 
            content: `I'll help you with "${selectedPrompt.description}". Let me assist you with that.`, 
            role: 'ai' 
          }]);
        }, 1000);
      }
    }
  };

  // Render insights panel
  const renderInsightsPanel = () => {
    if (!showInsights || insights.length === 0) return null;

    return (
      <AnimatePresence>
        {showInsightsPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Card
              size="small"
              style={{
                marginBottom: 16,
                borderColor: token.colorPrimary,
                backgroundColor: `${token.colorPrimary}10`
              }}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BulbOutlined style={{ marginRight: 8 }} />
                  Form Insights
                </div>
              }
              extra={
                <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={() => setShowInsightsPanel(false)}
                  size="small"
                />
              }
            >
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {insights.map((insight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {insight}
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Render validation issues panel
  const renderValidationPanel = () => {
    if (validationIssues.length === 0) return null;

    const isSuccess = validationIssues.length === 1 && validationIssues[0].includes('success');

    return (
      <AnimatePresence>
        {showValidationIssues && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <Alert
              type={isSuccess ? "success" : "warning"}
              message="AI Validation Results"
              description={
                <ul style={{ paddingLeft: 20, margin: '8px 0 0 0' }}>
                  {validationIssues.map((issue, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {issue}
                    </motion.li>
                  ))}
                </ul>
              }
              showIcon
              closable
              onClose={() => setShowValidationIssues(false)}
              style={{ marginBottom: 16 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Render completion progress
  const renderCompletionProgress = () => {
    if (!showCompletionProgress) return null;

    return (
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <Text type="secondary">Form Completion</Text>
          <Text strong>{completionProgress}%</Text>
        </div>
        <Progress
          percent={completionProgress}
          size="small"
          status={completionProgress === 100 ? "success" : "active"}
          strokeColor={
            completionProgress < 30 ? token.colorError :
            completionProgress < 70 ? token.colorWarning :
            token.colorSuccess
          }
        />
      </div>
    );
  };

  // Render thought process panel
  const renderThoughtProcess = () => {
    if (!showThoughtProcess || !showThoughts || thoughtChain.length === 0) return null;

    return (
      <div style={{ marginBottom: 16 }}>
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RobotOutlined style={{ marginRight: 8 }} />
              AI Thought Process
            </div>
          }
          size="small"
          extra={
            <Button
              type="text"
              icon={<CloseCircleOutlined />}
              onClick={() => setShowThoughts(false)}
              size="small"
            />
          }
          style={{
            backgroundColor: token.colorBgElevated,
            borderColor: token.colorBorderSecondary
          }}
        >
          <ThoughtChain
            items={thoughtChain.map((thought, index) => ({
              key: `thought-${index}`,
              content: thought
            }))}
          />
        </Card>
      </div>
    );
  };

  // Render AI chat panel
  const renderAIChat = () => {
    if (!showAIChat) return null;

    return (
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', marginBottom: 16 }}
          >
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RobotOutlined style={{ marginRight: 8 }} />
                  Form Assistant
                </div>
              }
              extra={
                <Button
                  type="text"
                  icon={<CloseCircleOutlined />}
                  onClick={() => setShowChat(false)}
                  size="small"
                />
              }
              style={{ height: 300 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12, padding: '0 4px' }}>
                  {chatMessages.length === 0 ? (
                    <div style={{ textAlign: 'center', color: token.colorTextSecondary, marginTop: 40 }}>
                      <MessageOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                      <p>Ask me anything about this form!</p>
                    </div>
                  ) : (
                    <Bubble.List
                      items={chatMessages.map((msg, idx) => ({
                        key: `msg-${idx}`,
                        content: msg.content,
                        role: msg.role
                      }))}
                      roles={{
                        user: { placement: 'end' },
                        ai: { 
                          placement: 'start',
                          typing: { step: 5, interval: 20 }
                        }
                      }}
                    />
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div style={{ display: 'flex', marginTop: 'auto' }}>
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onPressEnter={handleChatSubmit}
                    placeholder="Ask about this form..."
                    style={{ flex: 1 }}
                  />
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleChatSubmit}
                    style={{ marginLeft: 8 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Render predefined prompts
  const renderPredefinedPrompts = () => {
    if (!predefinedPrompts || predefinedPrompts.length === 0) return null;

    return (
      <div style={{ marginBottom: 16 }}>
        <Prompts
          title="Quick Actions"
          items={predefinedPrompts.map(prompt => ({
            key: prompt.key,
            label: prompt.label,
            description: prompt.description
          }))}
          onItemClick={(info) => handlePromptSelect(info.data.key)}
          wrap
          styles={{
            item: {
              flex: 'none',
              width: 'calc(33.33% - 8px)',
              backgroundImage: `linear-gradient(137deg, ${token.colorPrimaryBg} 0%, ${token.colorBgElevated} 100%)`,
              border: `1px solid ${token.colorBorderSecondary}`
            }
          }}
        />
      </div>
    );
  };

  // Enhance children with suggestions and auto-validation
  const enhanceChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return child;

      // Handle Form.Item
      if (child.type === Form.Item) {
        const fieldName = child.props.name;
        const childrenWithSuggestions = React.Children.map(child.props.children, innerChild => {
          if (!React.isValidElement(innerChild)) return innerChild;

          // Add suggestion to Input components
          if (innerChild.type === Input && fieldName && suggestions[fieldName]) {
            return React.cloneElement(innerChild, {
              suffix: (
                <Space>
                  {fieldStatus[fieldName] === 'complete' && (
                    <Badge status="success" />
                  )}
                  {fieldStatus[fieldName] === 'partial' && (
                    <Badge status="processing" />
                  )}
                  <Tooltip title="Click to apply suggestion">
                    <Button
                      type="text"
                      size="small"
                      icon={<CheckCircleOutlined />}
                      onClick={() => applySuggestion(fieldName, suggestions[fieldName])}
                      style={{ color: token.colorPrimary }}
                    />
                  </Tooltip>
                  {enableVoiceInput && (
                    <Tooltip title={isRecording ? "Stop recording" : "Voice input"}>
                      <Button
                        type="text"
                        size="small"
                        icon={isRecording ? <StopOutlined /> : <AudioOutlined />}
                        onClick={() => {
                          setActiveField(fieldName);
                          handleVoiceInput();
                        }}
                        style={{ color: isRecording && activeField === fieldName ? token.colorError : undefined }}
                      />
                    </Tooltip>
                  )}
                </Space>
              ),
              placeholder: innerChild.props.placeholder || `Enter ${fieldName}`,
              autoComplete: innerChild.props.autoComplete || 'off',
              status: learningMode === 'aggressive' && suggestions[fieldName] ? 'warning' : undefined,
              className: cyberpunk ? 'cyberpunk-input' : '',
              onFocus: (e: any) => {
                setActiveField(fieldName);
                if (innerChild.props.onFocus) {
                  innerChild.props.onFocus(e);
                }
              },
              onBlur: (e: any) => {
                setActiveField(null);
                if (innerChild.props.onBlur) {
                  innerChild.props.onBlur(e);
                }
              }
            });
          }

          // Add status indicators to other input types
          if ((innerChild.type === Input ||
               innerChild.type === Select ||
               innerChild.type === DatePicker) &&
              fieldName && fieldStatus[fieldName]) {

            const props: any = {
              className: cyberpunk ? 'cyberpunk-input' : '',
              onFocus: (e: any) => {
                setActiveField(fieldName);
                if (innerChild.props.onFocus) {
                  innerChild.props.onFocus(e);
                }
              },
              onBlur: (e: any) => {
                setActiveField(null);
                if (innerChild.props.onBlur) {
                  innerChild.props.onBlur(e);
                }
              }
            };

            // Add suffix for Input components
            if (innerChild.type === Input) {
              props.suffix = (
                <Space>
                  <Badge
                    status={
                      fieldStatus[fieldName] === 'complete' ? 'success' :
                      fieldStatus[fieldName] === 'partial' ? 'processing' :
                      'default'
                    }
                  />
                  {enableVoiceInput && (
                    <Tooltip title={isRecording ? "Stop recording" : "Voice input"}>
                      <Button
                        type="text"
                        size="small"
                        icon={isRecording ? <StopOutlined /> : <AudioOutlined />}
                        onClick={() => {
                          setActiveField(fieldName);
                          handleVoiceInput();
                        }}
                        style={{ color: isRecording && activeField === fieldName ? token.colorError : undefined }}
                      />
                    </Tooltip>
                  )}
                </Space>
              );
            }

            return React.cloneElement(innerChild, props);
          }

          return innerChild;
        });

        // Check if this field has dependencies
        const hasDependencies = fieldDependencies[child.props.name];
        
        // Check if this field has recommendations
        const hasRecommendations = showRecommendations && fieldRecommendations[child.props.name];
        
        // Check if this field has history
        const hasHistory = showFieldHistory && fieldHistory[child.props.name] && fieldHistory[child.props.name].length > 0;
        
        // Check if this field has importance rating
        const importance = showFieldImportance && fieldImportance[child.props.name];

        // Prepare extra content
        let extraContent = child.props.extra;
        
        // Add field dependencies info
        if (hasDependencies) {
          extraContent = (
            <>
              {extraContent}
              <div>
                <Text type="secondary" style={{ fontSize: '0.85em' }}>
                  <InfoCircleOutlined style={{ marginRight: 4 }} />
                  This field depends on: {hasDependencies.join(', ')}
                </Text>
              </div>
            </>
          );
        }
        
        // Add field recommendations
        if (hasRecommendations) {
          extraContent = (
            <>
              {extraContent}
              <div style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: '0.85em', display: 'block', marginBottom: 4 }}>
                  <StarOutlined style={{ marginRight: 4 }} />
                  Recommendations:
                </Text>
                <Space size={[0, 4]} wrap>
                  {fieldRecommendations[child.props.name].map((rec, idx) => (
                    <Tag
                      key={idx}
                      color="blue"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        formInstance.setFieldValue(child.props.name, rec);
                        updateFieldStatus(child.props.name, rec);
                      }}
                    >
                      {rec}
                    </Tag>
                  ))}
                </Space>
              </div>
            </>
          );
        }
        
        // Add field history
        if (hasHistory) {
          extraContent = (
            <>
              {extraContent}
              <div style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: '0.85em', display: 'block', marginBottom: 4 }}>
                  <HistoryOutlined style={{ marginRight: 4 }} />
                  Recent entries:
                </Text>
                <Space size={[0, 4]} wrap>
                  {fieldHistory[child.props.name].map((entry, idx) => (
                    <Tag
                      key={idx}
                      color="purple"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        formInstance.setFieldValue(child.props.name, entry);
                        updateFieldStatus(child.props.name, entry);
                      }}
                    >
                      {entry}
                    </Tag>
                  ))}
                </Space>
              </div>
            </>
          );
        }

        // Create label with importance indicator if needed
        let label = child.props.label;
        if (importance) {
          label = (
            <Space>
              {child.props.label}
              <Tooltip title={`${importance.charAt(0).toUpperCase() + importance.slice(1)} importance`}>
                {importance === 'high' ? (
                  <StarFilled style={{ color: token.colorError }} />
                ) : importance === 'medium' ? (
                  <StarFilled style={{ color: token.colorWarning }} />
                ) : (
                  <StarOutlined style={{ color: token.colorTextSecondary }} />
                )}
              </Tooltip>
            </Space>
          );
        }

        return React.cloneElement(child, {
          children: childrenWithSuggestions,
          validateTrigger: autoValidate ? ['onChange', 'onBlur'] : child.props.validateTrigger,
          extra: extraContent,
          label: label
        });
      }

      // Recursively process nested children
      if (child.props.children) {
        const enhancedChildren = enhanceChildren(child.props.children);
        return React.cloneElement(child, { children: enhancedChildren });
      }

      return child;
    });
  };

  // Render AI action buttons
  const renderAIActions = () => {
    if (!showAICompletion && !showAIValidation && !showAIChat) return null;

    return (
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          {showAIChat && (
            <Button
              type="default"
              icon={<MessageOutlined />}
              onClick={() => setShowChat(!showChat)}
              className={cyberpunk ? 'cyberpunk-button' : ''}
            >
              AI Assistant
            </Button>
          )}
          
          {showAIValidation && onAIValidate && (
            <Button
              type="default"
              icon={isAIValidating ? <LoadingOutlined /> : <CheckCircleOutlined />}
              onClick={handleAIValidate}
              loading={isAIValidating}
              className={cyberpunk ? 'cyberpunk-button' : ''}
            >
              AI Validate
            </Button>
          )}

          {showAICompletion && onAIComplete && (
            <Button
              type="primary"
              icon={isAICompleting ? <LoadingOutlined /> : <ThunderboltOutlined />}
              onClick={handleAIComplete}
              loading={isAICompleting}
              className={cyberpunk ? 'cyberpunk-button' : ''}
            >
              AI Complete
            </Button>
          )}
        </Space>
      </div>
    );
  };

  // Render AI model info
  const renderAIModelInfo = () => {
    if (!showAICompletion && !showAIValidation) return null;

    return (
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <RobotOutlined />
          <Text type="secondary">AI Model: {aiModel}</Text>
        </Space>

        <Popover
          title="AI Form Assistant"
          content={
            <div style={{ maxWidth: 300 }}>
              <p>This form is enhanced with AI capabilities:</p>
              <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
                {showAICompletion && (
                  <li>AI can complete the form based on partial information</li>
                )}
                {showAIValidation && (
                  <li>AI can validate the form for logical consistency</li>
                )}
                {showSuggestions && (
                  <li>AI provides smart suggestions as you type</li>
                )}
                {showInsights && (
                  <li>AI generates insights about your form data</li>
                )}
                {showThoughtProcess && (
                  <li>AI shows its reasoning process</li>
                )}
                {enableVoiceInput && (
                  <li>Voice input is available for form fields</li>
                )}
              </ul>
              <p>Learning Mode: <strong>{learningMode}</strong></p>
            </div>
          }
          trigger="click"
        >
          <Button type="text" icon={<QuestionCircleOutlined />} size="small">
            AI Info
          </Button>
        </Popover>
      </div>
    );
  };

  return (
    <div className={`predictive-form ${cyberpunk ? 'cyberpunk' : ''}`}>
      {renderAIModelInfo()}

      {renderCompletionProgress()}

      {renderValidationPanel()}

      {renderPredefinedPrompts()}

      {(showInsights && insights.length > 0) && (
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={() => setShowInsightsPanel(!showInsightsPanel)}
          >
            {showInsightsPanel ? 'Hide Insights' : 'Show Insights'}
          </Button>
        </div>
      )}

      {renderInsightsPanel()}

      {renderThoughtProcess()}

      {renderAIChat()}

      {learningMode === 'active' && (
        <Alert
          message="AI Learning Mode: Active"
          description="This form learns from your input to provide better suggestions in the future."
          type="info"
          showIcon
          icon={<RobotOutlined />}
          style={{ marginBottom: 16 }}
          closable
        />
      )}

      {learningMode === 'aggressive' && (
        <Alert
          message="AI Learning Mode: Aggressive"
          description="This form will automatically apply AI suggestions when they are highly confident."
          type="warning"
          showIcon
          icon={<ThunderboltOutlined />}
          style={{ marginBottom: 16 }}
          closable
        />
      )}

      <Form
        form={formInstance}
        initialValues={initialValues}
        onValuesChange={handleValuesChange}
        {...props}
      >
        {enhanceChildren(children)}
      </Form>

      {renderAIActions()}

      <style jsx>{`
        .predictive-form.cyberpunk .cyberpunk-input {
          border-color: ${token.colorPrimary};
          background-color: ${token.colorBgContainer};
        }

        .predictive-form.cyberpunk .cyberpunk-input:focus,
        .predictive-form.cyberpunk .cyberpunk-input:hover {
          border-color: ${token.colorPrimary};
          box-shadow: 0 0 5px ${token.colorPrimary};
        }

        .predictive-form.cyberpunk .cyberpunk-button {
          border-color: ${token.colorPrimary};
          background-color: transparent;
          color: ${token.colorPrimary};
        }

        .predictive-form.cyberpunk .cyberpunk-button:hover {
          background-color: ${token.colorPrimary}20;
          box-shadow: 0 0 5px ${token.colorPrimary};
        }

        .predictive-form.cyberpunk .ant-form-item-label > label {
          color: ${token.colorTextSecondary};
        }
      `}</style>
    </div>
  );
};

export default EnhancedPredictiveForm;