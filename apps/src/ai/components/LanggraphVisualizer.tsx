import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, Typography, Steps, Tooltip } from 'antd';
import { LanggraphGraph, LanggraphNode } from '../services/GroqSwarmLanggraphService';

const { Title, Text } = Typography;

interface LanggraphVisualizerProps {
  graph: LanggraphGraph;
  currentNodeId: string | null;
  nodeHistory: string[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component for visualizing a Langgraph workflow
 */
const LanggraphVisualizer: React.FC<LanggraphVisualizerProps> = ({
  graph,
  currentNodeId,
  nodeHistory,
  className,
  style
}) => {
  // Sort nodes in execution order
  const sortedNodes = useMemo(() => {
    const result: LanggraphNode[] = [];
    const visited = new Set<string>();
    
    // Helper function for depth-first traversal
    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      
      const node = graph.nodes.find(n => n.id === nodeId);
      if (!node) return;
      
      result.push(node);
      
      // Find outgoing edges
      const outgoingEdges = graph.edges.filter(e => e.from === nodeId);
      for (const edge of outgoingEdges) {
        visit(edge.to);
      }
    };
    
    // Start traversal from the entry node
    visit(graph.entryNode);
    
    return result;
  }, [graph]);

  // Convert nodes to steps
  const steps = useMemo(() => {
    return sortedNodes.map(node => {
      // Determine the status of the step
      let status: 'wait' | 'process' | 'finish' | 'error' = 'wait';
      
      if (nodeHistory.includes(node.id)) {
        status = 'finish';
      }
      
      if (node.id === currentNodeId) {
        status = 'process';
      }
      
      return {
        title: node.name,
        description: node.description,
        status
      };
    });
  }, [sortedNodes, currentNodeId, nodeHistory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
      style={style}
    >
      <Card>
        <Title level={4}>Workflow Visualization</Title>
        <Text type="secondary">Current node: {currentNodeId ? sortedNodes.find(n => n.id === currentNodeId)?.name || currentNodeId : 'None'}</Text>
        
        <div style={{ marginTop: 20 }}>
          <Steps
            direction="vertical"
            current={steps.findIndex(step => step.status === 'process')}
            items={steps.map((step, index) => ({
              title: (
                <Tooltip title={step.description}>
                  <span>{step.title}</span>
                </Tooltip>
              ),
              description: (
                <Text ellipsis={{ tooltip: step.description }}>
                  {step.description}
                </Text>
              ),
              status: step.status
            }))}
          />
        </div>
      </Card>
    </motion.div>
  );
};

export default LanggraphVisualizer;