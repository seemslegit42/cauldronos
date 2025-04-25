# Groq Swarm Langgraph Integration

This directory contains the Python backend for the Groq Swarm Langgraph integration. Langgraph is a framework for building complex AI workflows with branching logic and state management.

## Overview

The Groq Swarm Langgraph integration enables the creation of sophisticated multi-step AI processes with the following features:

- **Multi-step Workflows**: Break down complex tasks into smaller, more manageable steps
- **Specialized Agents**: Use different agents with specific instructions for each step
- **Branching Logic**: Create workflows with conditional branching based on intermediate results
- **Visualization**: Visualize the workflow and track progress through each step
- **Streaming Responses**: Get real-time updates as the workflow progresses

## Directory Structure

```
swarm-groq/
├── examples/
│   └── langgraph_bridge.py  # Bridge between Node.js and Python for Langgraph
├── README.md                # This file
```

## Setup

To use the Groq Swarm Langgraph integration, you need to have Python installed with the following packages:

```bash
pip install groq-swarm langgraph
```

## Usage

The integration is used through the Node.js API, which communicates with the Python backend using the `langgraph_bridge.py` script. The script reads a JSON request from stdin, processes it using Langgraph, and writes the result to stdout.

### Example Request

```json
{
  "workflow": {
    "name": "Reasoning Workflow",
    "description": "A workflow for reasoning about a topic",
    "graph": {
      "nodes": [
        {
          "id": "understanding",
          "name": "Understanding",
          "description": "Understand the task and requirements",
          "agent": {
            "name": "Understanding Agent",
            "instructions": "You are an understanding agent...",
            "model": "llama3-70b-8192"
          }
        },
        {
          "id": "planning",
          "name": "Planning",
          "description": "Create a plan to accomplish the task",
          "agent": {
            "name": "Planning Agent",
            "instructions": "You are a planning agent...",
            "model": "llama3-70b-8192"
          }
        }
      ],
      "edges": [
        {
          "from": "understanding",
          "to": "planning"
        }
      ],
      "entryNode": "understanding",
      "exitNode": "planning"
    }
  },
  "input": "What is the meaning of life?",
  "context_variables": {
    "currentPage": "Langgraph Demo",
    "userRole": "User"
  },
  "stream": true
}
```

### Example Response

```json
{"delim": "start"}
{"node": {"id": "understanding", "name": "Understanding", "description": "Understand the task and requirements", "agent": {"name": "Understanding Agent", "instructions": "You are an understanding agent...", "model": "llama3-70b-8192"}}, "node_id": "understanding"}
{"content": "I understand that you're asking about the meaning of life.\n\n", "node_id": "understanding"}
{"content": "This is a philosophical question that has been debated throughout human history.\n\n", "node_id": "understanding"}
{"node": {"id": "planning", "name": "Planning", "description": "Create a plan to accomplish the task", "agent": {"name": "Planning Agent", "instructions": "You are a planning agent...", "model": "llama3-70b-8192"}}, "node_id": "planning"}
{"content": "Here's my plan for addressing your question about the meaning of life:\n\n", "node_id": "planning"}
{"content": "1. Explore different philosophical perspectives\n2. Consider scientific viewpoints\n3. Examine religious and spiritual beliefs\n4. Look at personal meaning and purpose\n\n", "node_id": "planning"}
{"delim": "end", "response": {"messages": [{"role": "user", "content": "What is the meaning of life?"}, {"role": "assistant", "content": "Here's my plan for addressing your question about the meaning of life:\n\n1. Explore different philosophical perspectives\n2. Consider scientific viewpoints\n3. Examine religious and spiritual beliefs\n4. Look at personal meaning and purpose"}], "final_node_id": "planning"}}
```

## Integration with Node.js

The Node.js API communicates with the Python backend using the `child_process` module to spawn a Python process and communicate with it using stdin and stdout.

## License

This project is licensed under the MIT License - see the LICENSE file for details.