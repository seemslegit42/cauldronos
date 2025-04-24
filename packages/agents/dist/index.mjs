// src/AIProvider.tsx
import { createContext, useContext } from "react";
import { jsx } from "react/jsx-runtime";
var AIContext = createContext({
  isVisible: false,
  toggleVisibility: () => {
  },
  messages: [],
  addMessage: () => {
  },
  clearMessages: () => {
  },
  sendMessage: async () => ({ id: "", role: "assistant", content: "", timestamp: /* @__PURE__ */ new Date() }),
  sendMessageStreaming: async () => ({ id: "", role: "assistant", content: "", timestamp: /* @__PURE__ */ new Date() }),
  contextData: {},
  updateContextData: () => {
  },
  useSwarm: true,
  toggleUseSwarm: () => {
  },
  isProcessing: false
});
var AIProvider = ({ children }) => {
  const contextValue = {
    isVisible: false,
    toggleVisibility: () => {
    },
    messages: [],
    addMessage: () => {
    },
    clearMessages: () => {
    },
    sendMessage: async () => ({ id: "", role: "assistant", content: "", timestamp: /* @__PURE__ */ new Date() }),
    sendMessageStreaming: async () => ({ id: "", role: "assistant", content: "", timestamp: /* @__PURE__ */ new Date() }),
    contextData: {},
    updateContextData: () => {
    },
    useSwarm: true,
    toggleUseSwarm: () => {
    },
    isProcessing: false
  };
  return /* @__PURE__ */ jsx(AIContext.Provider, { value: contextValue, children });
};
var AIProvider_default = AIProvider;

// src/AIAssistantProvider.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var AIAssistantContext = createContext2({
  isVisible: false,
  toggleVisibility: () => {
  },
  messages: [],
  addMessage: () => {
  },
  clearMessages: () => {
  },
  sendMessage: async () => ({ id: "", role: "assistant", content: "", timestamp: /* @__PURE__ */ new Date() }),
  contextData: {},
  updateContextData: () => {
  }
});
var AIAssistantProvider = ({ children }) => {
  const contextValue = {
    isVisible: false,
    toggleVisibility: () => {
    },
    messages: [],
    addMessage: () => {
    },
    clearMessages: () => {
    },
    sendMessage: async () => ({ id: "", role: "assistant", content: "", timestamp: /* @__PURE__ */ new Date() }),
    contextData: {},
    updateContextData: () => {
    }
  };
  return /* @__PURE__ */ jsx2(AIAssistantContext.Provider, { value: contextValue, children });
};
var AIAssistantProvider_default = AIAssistantProvider;

// src/index.ts
var CauldronAgents = {
  version: "0.1.0",
  name: "CauldronOS Agents"
};
export {
  AIAssistantProvider_default as AIAssistantProvider,
  AIProvider_default as AIProvider,
  CauldronAgents
};
//# sourceMappingURL=index.mjs.map