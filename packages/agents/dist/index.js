"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AIAssistantProvider: () => AIAssistantProvider_default,
  AIProvider: () => AIProvider_default,
  CauldronAgents: () => CauldronAgents
});
module.exports = __toCommonJS(src_exports);

// src/AIProvider.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var AIContext = (0, import_react.createContext)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AIContext.Provider, { value: contextValue, children });
};
var AIProvider_default = AIProvider;

// src/AIAssistantProvider.tsx
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var AIAssistantContext = (0, import_react2.createContext)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AIAssistantContext.Provider, { value: contextValue, children });
};
var AIAssistantProvider_default = AIAssistantProvider;

// src/index.ts
var CauldronAgents = {
  version: "0.1.0",
  name: "CauldronOS Agents"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AIAssistantProvider,
  AIProvider,
  CauldronAgents
});
//# sourceMappingURL=index.js.map