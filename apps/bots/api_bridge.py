#!/usr/bin/env python
"""
API Bridge for Groq Swarm

This script acts as a bridge between the Node.js API and the Groq Swarm library.
It reads JSON input from stdin and writes JSON output to stdout.
"""

import json
import sys
import os
from typing import Dict, List, Any, Optional, Callable
import inspect

# Add the parent directory to the path so we can import the swarm module
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from swarm import Swarm, Agent


def main():
    """Main function to process the input and run the Groq Swarm."""
    # Read JSON input from stdin
    try:
        input_data = json.loads(sys.stdin.read())
    except json.JSONDecodeError as e:
        sys.stderr.write(f"Error parsing JSON input: {str(e)}\n")
        sys.exit(1)

    # Extract the required parameters
    messages = input_data.get('messages', [])
    context_variables = input_data.get('context_variables', {})
    agent_config = input_data.get('agent', {})
    stream = input_data.get('stream', False)

    # Validate the input
    if not messages:
        sys.stderr.write("Error: Messages are required\n")
        sys.exit(1)

    if not agent_config:
        sys.stderr.write("Error: Agent configuration is required\n")
        sys.exit(1)

    # Create the Swarm client
    client = Swarm()

    # Create the Agent
    agent_functions = []
    if 'functions' in agent_config:
        for func_def in agent_config['functions']:
            # Convert function definitions to actual Python functions
            agent_functions.append(create_function_from_definition(func_def))

    agent = Agent(
        name=agent_config.get('name', 'Agent'),
        instructions=agent_config.get('instructions', 'You are a helpful agent.'),
        model=agent_config.get('model', 'llama3-70b-8192'),
        functions=agent_functions,
        tool_choice=agent_config.get('tool_choice', None),
        parallel_tool_calls=agent_config.get('parallel_tool_calls', False)
    )

    # Run the Swarm
    try:
        if stream:
            # Handle streaming response
            for chunk in client.run_and_stream(
                agent=agent,
                messages=messages,
                context_variables=context_variables,
                debug=False
            ):
                # Write each chunk as a JSON string followed by a newline
                sys.stdout.write(json.dumps(chunk) + '\n')
                sys.stdout.flush()
        else:
            # Handle non-streaming response
            response = client.run(
                agent=agent,
                messages=messages,
                context_variables=context_variables,
                debug=False
            )
            
            # Convert the response to a JSON-serializable format
            result = {
                'messages': response.messages,
                'context_variables': response.context_variables
            }
            
            # Write the result as JSON
            sys.stdout.write(json.dumps(result))
            sys.stdout.flush()
    except Exception as e:
        sys.stderr.write(f"Error running Groq Swarm: {str(e)}\n")
        sys.exit(1)


def create_function_from_definition(func_def: Dict[str, Any]) -> Callable:
    """
    Create a Python function from a function definition.
    
    Args:
        func_def: A dictionary containing the function definition
        
    Returns:
        A callable Python function
    """
    name = func_def.get('name', 'unknown_function')
    description = func_def.get('description', '')
    parameters = func_def.get('parameters', {})
    
    # Create a function that returns a mock response
    def mock_function(**kwargs):
        # In a real implementation, this would call an actual function
        # For now, we'll just return a mock response
        return json.dumps({
            'function': name,
            'args': kwargs,
            'result': f"Mock response from {name}"
        })
    
    # Set the function name and docstring
    mock_function.__name__ = name
    mock_function.__doc__ = description
    
    return mock_function


if __name__ == "__main__":
    main()
