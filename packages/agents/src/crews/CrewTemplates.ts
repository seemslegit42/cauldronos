import { CrewConfig } from '../services/CrewService';
import { ResearchAgent, ContentAgent, ReviewAgent } from '../agents/SpecializedAgents';

/**
 * Content Creation Crew - A crew for researching and creating high-quality content
 */
export const ContentCreationCrew: CrewConfig = {
  id: 'content-creation-crew',
  name: 'Content Creation Crew',
  description: 'A crew for researching and creating high-quality content',
  agents: [
    ResearchAgent,
    ContentAgent,
    ReviewAgent,
  ],
  tasks: [
    {
      id: 'research-topic',
      description: 'Research the topic and gather relevant information',
      agentId: 'research-agent',
      expectedOutput: 'Comprehensive research findings on the topic',
    },
    {
      id: 'create-content',
      description: 'Create high-quality content based on the research',
      agentId: 'content-agent',
      expectedOutput: 'Well-structured content draft',
      dependencies: ['research-topic'],
    },
    {
      id: 'review-content',
      description: 'Review and improve the content',
      agentId: 'review-agent',
      expectedOutput: 'Polished final content with improvements',
      dependencies: ['create-content'],
    },
  ],
  process: 'sequential',
  verbose: true,
};

/**
 * Data Analysis Crew - A crew for analyzing data and generating insights
 */
export const DataAnalysisCrew: CrewConfig = {
  id: 'data-analysis-crew',
  name: 'Data Analysis Crew',
  description: 'A crew for analyzing data and generating insights',
  agents: [
    ResearchAgent,
    {
      ...ContentAgent,
      name: 'Data Visualization Agent',
      description: 'Specialized in creating data visualizations and reports',
      systemPrompt: `You are a Data Visualization Agent, specialized in creating clear and insightful data visualizations and reports.
Your primary responsibilities are:
1. Interpret complex data and analysis
2. Determine the most effective visualization methods for the data
3. Create clear, accurate descriptions of visualizations
4. Explain insights in an accessible way
5. Structure reports to highlight key findings

When creating visualizations and reports:
- Focus on clarity and accuracy
- Choose appropriate visualization types for the data
- Highlight key trends and patterns
- Provide context and interpretation
- Ensure visualizations are accessible and understandable
- Structure reports with a logical flow from data to insights`,
    },
    ReviewAgent,
  ],
  tasks: [
    {
      id: 'analyze-data',
      description: 'Analyze the data and identify patterns and insights',
      agentId: 'research-agent',
      expectedOutput: 'Comprehensive data analysis with key findings',
    },
    {
      id: 'create-visualizations',
      description: 'Create visualizations and reports based on the analysis',
      agentId: 'content-agent',
      expectedOutput: 'Data visualization descriptions and report draft',
      dependencies: ['analyze-data'],
    },
    {
      id: 'review-report',
      description: 'Review and improve the data report',
      agentId: 'review-agent',
      expectedOutput: 'Polished final report with improvements',
      dependencies: ['create-visualizations'],
    },
  ],
  process: 'sequential',
  verbose: true,
};

/**
 * Problem-Solving Crew - A crew for solving complex problems
 */
export const ProblemSolvingCrew: CrewConfig = {
  id: 'problem-solving-crew',
  name: 'Problem-Solving Crew',
  description: 'A crew for solving complex problems',
  agents: [
    ResearchAgent,
    {
      ...ContentAgent,
      name: 'Solution Architect',
      description: 'Specialized in designing solutions to complex problems',
      systemPrompt: `You are a Solution Architect, specialized in designing solutions to complex problems.
Your primary responsibilities are:
1. Understand the problem space thoroughly
2. Design comprehensive solutions based on research
3. Consider multiple approaches and their trade-offs
4. Create detailed implementation plans
5. Anticipate potential challenges and mitigations

When designing solutions:
- Be systematic and thorough in your approach
- Consider multiple solution options
- Evaluate trade-offs between different approaches
- Provide detailed implementation steps
- Anticipate potential challenges and how to address them
- Ensure solutions are practical and feasible`,
    },
    ReviewAgent,
  ],
  tasks: [
    {
      id: 'research-problem',
      description: 'Research and understand the problem thoroughly',
      agentId: 'research-agent',
      expectedOutput: 'Comprehensive problem analysis',
    },
    {
      id: 'design-solution',
      description: 'Design a solution to the problem',
      agentId: 'content-agent',
      expectedOutput: 'Detailed solution design and implementation plan',
      dependencies: ['research-problem'],
    },
    {
      id: 'review-solution',
      description: 'Review and improve the solution',
      agentId: 'review-agent',
      expectedOutput: 'Refined solution with improvements and considerations',
      dependencies: ['design-solution'],
    },
  ],
  process: 'sequential',
  verbose: true,
};

/**
 * All crew templates
 */
export const CrewTemplates = {
  ContentCreationCrew,
  DataAnalysisCrew,
  ProblemSolvingCrew,
};

export default CrewTemplates;
