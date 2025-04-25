import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, InputNumber, Button, Space, Divider } from 'antd';
import { BarChartOutlined, TableOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { PluginRegistration, FeatureBlockRegistration, FeatureBlockRenderProps, FeatureBlockSettingsProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Feature Block: Data Table
const DataTableBlock: FeatureBlockRegistration = {
  id: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format with sorting and filtering capabilities',
  configSchema: z.object({
    columns: z.array(z.string()).default(['Name', 'Value', 'Change']),
    pageSize: z.number().min(5).max(100).default(10),
    showPagination: z.boolean().default(true),
    enableSorting: z.boolean().default(true),
    enableFiltering: z.boolean().default(true),
  }),
  defaultConfig: {
    columns: ['Name', 'Value', 'Change'],
    pageSize: 10,
    showPagination: true,
    enableSorting: true,
    enableFiltering: true,
  },
  icon: <TableOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title="Data Table Block" className="mb-4">
      <Paragraph>
        This is a data table block that displays data in a tabular format.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Columns: {config.columns.join(', ')}</li>
          <li>Page Size: {config.pageSize}</li>
          <li>Show Pagination: {config.showPagination ? 'Yes' : 'No'}</li>
          <li>Enable Sorting: {config.enableSorting ? 'Yes' : 'No'}</li>
          <li>Enable Filtering: {config.enableFiltering ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Page Size">
        <InputNumber
          min={5}
          max={100}
          value={config.pageSize}
          onChange={(value) => onConfigChange({ ...config, pageSize: value })}
        />
      </Form.Item>
      <Form.Item label="Show Pagination">
        <Switch
          checked={config.showPagination}
          onChange={(checked) => onConfigChange({ ...config, showPagination: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Sorting">
        <Switch
          checked={config.enableSorting}
          onChange={(checked) => onConfigChange({ ...config, enableSorting: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Filtering">
        <Switch
          checked={config.enableFiltering}
          onChange={(checked) => onConfigChange({ ...config, enableFiltering: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Bar Chart
const BarChartBlock: FeatureBlockRegistration = {
  id: 'bar-chart',
  name: 'Bar Chart',
  description: 'Visualize data using a bar chart with customizable options',
  configSchema: z.object({
    title: z.string().default('Bar Chart'),
    showLegend: z.boolean().default(true),
    barColor: z.string().default('#1890ff'),
    showGridLines: z.boolean().default(true),
    animationDuration: z.number().min(0).max(2000).default(500),
  }),
  defaultConfig: {
    title: 'Bar Chart',
    showLegend: true,
    barColor: '#1890ff',
    showGridLines: true,
    animationDuration: 500,
  },
  icon: <BarChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a bar chart block that visualizes data using bars.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Bar Color: <span style={{ color: config.barColor }}>{config.barColor}</span></li>
          <li>Show Grid Lines: {config.showGridLines ? 'Yes' : 'No'}</li>
          <li>Animation Duration: {config.animationDuration}ms</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Bar Color">
        <Input
          type="color"
          value={config.barColor}
          onChange={(e) => onConfigChange({ ...config, barColor: e.target.value })}
          style={{ width: 100 }}
        />
      </Form.Item>
      <Form.Item label="Show Grid Lines">
        <Switch
          checked={config.showGridLines}
          onChange={(checked) => onConfigChange({ ...config, showGridLines: checked })}
        />
      </Form.Item>
      <Form.Item label="Animation Duration (ms)">
        <InputNumber
          min={0}
          max={2000}
          value={config.animationDuration}
          onChange={(value) => onConfigChange({ ...config, animationDuration: value })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Pie Chart
const PieChartBlock: FeatureBlockRegistration = {
  id: 'pie-chart',
  name: 'Pie Chart',
  description: 'Visualize data distribution using a pie chart',
  configSchema: z.object({
    title: z.string().default('Pie Chart'),
    showLegend: z.boolean().default(true),
    showLabels: z.boolean().default(true),
    showPercentage: z.boolean().default(true),
    donut: z.boolean().default(false),
  }),
  defaultConfig: {
    title: 'Pie Chart',
    showLegend: true,
    showLabels: true,
    showPercentage: true,
    donut: false,
  },
  icon: <PieChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a pie chart block that visualizes data distribution.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Show Labels: {config.showLabels ? 'Yes' : 'No'}</li>
          <li>Show Percentage: {config.showPercentage ? 'Yes' : 'No'}</li>
          <li>Donut Chart: {config.donut ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Labels">
        <Switch
          checked={config.showLabels}
          onChange={(checked) => onConfigChange({ ...config, showLabels: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Percentage">
        <Switch
          checked={config.showPercentage}
          onChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
        />
      </Form.Item>
      <Form.Item label="Donut Chart">
        <Switch
          checked={config.donut}
          onChange={(checked) => onConfigChange({ ...config, donut: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Main Plugin Registration
const FeaturePluginExample: PluginRegistration = {
  id: 'feature-plugin-example',
  name: 'Feature Plugin Example',
  description: 'An example plugin that demonstrates the feature block system',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'feature',
  configSchema: z.object({
    title: z.string().default('Feature Plugin Example'),
    description: z.string().default('This plugin demonstrates the feature block system'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  defaultConfig: {
    title: 'Feature Plugin Example',
    description: 'This plugin demonstrates the feature block system',
    theme: 'system',
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>{config.description}</Paragraph>
      <Divider />
      <Title level={4}>Feature Blocks</Title>
      <Paragraph>
        This plugin includes several feature blocks that can be enabled or disabled individually:
      </Paragraph>
      <ul>
        <li><strong>Data Table</strong>: Display data in a tabular format</li>
        <li><strong>Bar Chart</strong>: Visualize data using a bar chart</li>
        <li><strong>Pie Chart</strong>: Visualize data distribution using a pie chart</li>
      </ul>
      <Paragraph>
        Go to the Feature Blocks tab to manage these blocks.
      </Paragraph>
    </Card>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <Form layout="vertical">
      <Form.Item label="Plugin Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={config.description}
          onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Theme">
        <Select
          value={config.theme}
          onChange={(value) => onConfigChange({ ...config, theme: value })}
          style={{ width: 200 }}
        >
          <Option value="light">Light</Option>
          <Option value="dark">Dark</Option>
          <Option value="system">System (Auto)</Option>
        </Select>
      </Form.Item>
    </Form>
  ),
  featureBlocks: [
    DataTableBlock,
    BarChartBlock,
    PieChartBlock,
  ],
};

export default FeaturePluginExample;import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, InputNumber, Button, Space, Divider } from 'antd';
import { BarChartOutlined, TableOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { PluginRegistration, FeatureBlockRegistration, FeatureBlockRenderProps, FeatureBlockSettingsProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Feature Block: Data Table
const DataTableBlock: FeatureBlockRegistration = {
  id: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format with sorting and filtering capabilities',
  configSchema: z.object({
    columns: z.array(z.string()).default(['Name', 'Value', 'Change']),
    pageSize: z.number().min(5).max(100).default(10),
    showPagination: z.boolean().default(true),
    enableSorting: z.boolean().default(true),
    enableFiltering: z.boolean().default(true),
  }),
  defaultConfig: {
    columns: ['Name', 'Value', 'Change'],
    pageSize: 10,
    showPagination: true,
    enableSorting: true,
    enableFiltering: true,
  },
  icon: <TableOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title="Data Table Block" className="mb-4">
      <Paragraph>
        This is a data table block that displays data in a tabular format.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Columns: {config.columns.join(', ')}</li>
          <li>Page Size: {config.pageSize}</li>
          <li>Show Pagination: {config.showPagination ? 'Yes' : 'No'}</li>
          <li>Enable Sorting: {config.enableSorting ? 'Yes' : 'No'}</li>
          <li>Enable Filtering: {config.enableFiltering ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Page Size">
        <InputNumber
          min={5}
          max={100}
          value={config.pageSize}
          onChange={(value) => onConfigChange({ ...config, pageSize: value })}
        />
      </Form.Item>
      <Form.Item label="Show Pagination">
        <Switch
          checked={config.showPagination}
          onChange={(checked) => onConfigChange({ ...config, showPagination: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Sorting">
        <Switch
          checked={config.enableSorting}
          onChange={(checked) => onConfigChange({ ...config, enableSorting: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Filtering">
        <Switch
          checked={config.enableFiltering}
          onChange={(checked) => onConfigChange({ ...config, enableFiltering: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Bar Chart
const BarChartBlock: FeatureBlockRegistration = {
  id: 'bar-chart',
  name: 'Bar Chart',
  description: 'Visualize data using a bar chart with customizable options',
  configSchema: z.object({
    title: z.string().default('Bar Chart'),
    showLegend: z.boolean().default(true),
    barColor: z.string().default('#1890ff'),
    showGridLines: z.boolean().default(true),
    animationDuration: z.number().min(0).max(2000).default(500),
  }),
  defaultConfig: {
    title: 'Bar Chart',
    showLegend: true,
    barColor: '#1890ff',
    showGridLines: true,
    animationDuration: 500,
  },
  icon: <BarChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a bar chart block that visualizes data using bars.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Bar Color: <span style={{ color: config.barColor }}>{config.barColor}</span></li>
          <li>Show Grid Lines: {config.showGridLines ? 'Yes' : 'No'}</li>
          <li>Animation Duration: {config.animationDuration}ms</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Bar Color">
        <Input
          type="color"
          value={config.barColor}
          onChange={(e) => onConfigChange({ ...config, barColor: e.target.value })}
          style={{ width: 100 }}
        />
      </Form.Item>
      <Form.Item label="Show Grid Lines">
        <Switch
          checked={config.showGridLines}
          onChange={(checked) => onConfigChange({ ...config, showGridLines: checked })}
        />
      </Form.Item>
      <Form.Item label="Animation Duration (ms)">
        <InputNumber
          min={0}
          max={2000}
          value={config.animationDuration}
          onChange={(value) => onConfigChange({ ...config, animationDuration: value })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Pie Chart
const PieChartBlock: FeatureBlockRegistration = {
  id: 'pie-chart',
  name: 'Pie Chart',
  description: 'Visualize data distribution using a pie chart',
  configSchema: z.object({
    title: z.string().default('Pie Chart'),
    showLegend: z.boolean().default(true),
    showLabels: z.boolean().default(true),
    showPercentage: z.boolean().default(true),
    donut: z.boolean().default(false),
  }),
  defaultConfig: {
    title: 'Pie Chart',
    showLegend: true,
    showLabels: true,
    showPercentage: true,
    donut: false,
  },
  icon: <PieChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a pie chart block that visualizes data distribution.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Show Labels: {config.showLabels ? 'Yes' : 'No'}</li>
          <li>Show Percentage: {config.showPercentage ? 'Yes' : 'No'}</li>
          <li>Donut Chart: {config.donut ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Labels">
        <Switch
          checked={config.showLabels}
          onChange={(checked) => onConfigChange({ ...config, showLabels: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Percentage">
        <Switch
          checked={config.showPercentage}
          onChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
        />
      </Form.Item>
      <Form.Item label="Donut Chart">
        <Switch
          checked={config.donut}
          onChange={(checked) => onConfigChange({ ...config, donut: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Main Plugin Registration
const FeaturePluginExample: PluginRegistration = {
  id: 'feature-plugin-example',
  name: 'Feature Plugin Example',
  description: 'An example plugin that demonstrates the feature block system',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'feature',
  configSchema: z.object({
    title: z.string().default('Feature Plugin Example'),
    description: z.string().default('This plugin demonstrates the feature block system'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  defaultConfig: {
    title: 'Feature Plugin Example',
    description: 'This plugin demonstrates the feature block system',
    theme: 'system',
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>{config.description}</Paragraph>
      <Divider />
      <Title level={4}>Feature Blocks</Title>
      <Paragraph>
        This plugin includes several feature blocks that can be enabled or disabled individually:
      </Paragraph>
      <ul>
        <li><strong>Data Table</strong>: Display data in a tabular format</li>
        <li><strong>Bar Chart</strong>: Visualize data using a bar chart</li>
        <li><strong>Pie Chart</strong>: Visualize data distribution using a pie chart</li>
      </ul>
      <Paragraph>
        Go to the Feature Blocks tab to manage these blocks.
      </Paragraph>
    </Card>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <Form layout="vertical">
      <Form.Item label="Plugin Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={config.description}
          onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Theme">
        <Select
          value={config.theme}
          onChange={(value) => onConfigChange({ ...config, theme: value })}
          style={{ width: 200 }}
        >
          <Option value="light">Light</Option>
          <Option value="dark">Dark</Option>
          <Option value="system">System (Auto)</Option>
        </Select>
      </Form.Item>
    </Form>
  ),
  featureBlocks: [
    DataTableBlock,
    BarChartBlock,
    PieChartBlock,
  ],
};

export default FeaturePluginExample;import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, InputNumber, Button, Space, Divider } from 'antd';
import { BarChartOutlined, TableOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { PluginRegistration, FeatureBlockRegistration, FeatureBlockRenderProps, FeatureBlockSettingsProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Feature Block: Data Table
const DataTableBlock: FeatureBlockRegistration = {
  id: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format with sorting and filtering capabilities',
  configSchema: z.object({
    columns: z.array(z.string()).default(['Name', 'Value', 'Change']),
    pageSize: z.number().min(5).max(100).default(10),
    showPagination: z.boolean().default(true),
    enableSorting: z.boolean().default(true),
    enableFiltering: z.boolean().default(true),
  }),
  defaultConfig: {
    columns: ['Name', 'Value', 'Change'],
    pageSize: 10,
    showPagination: true,
    enableSorting: true,
    enableFiltering: true,
  },
  icon: <TableOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title="Data Table Block" className="mb-4">
      <Paragraph>
        This is a data table block that displays data in a tabular format.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Columns: {config.columns.join(', ')}</li>
          <li>Page Size: {config.pageSize}</li>
          <li>Show Pagination: {config.showPagination ? 'Yes' : 'No'}</li>
          <li>Enable Sorting: {config.enableSorting ? 'Yes' : 'No'}</li>
          <li>Enable Filtering: {config.enableFiltering ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Page Size">
        <InputNumber
          min={5}
          max={100}
          value={config.pageSize}
          onChange={(value) => onConfigChange({ ...config, pageSize: value })}
        />
      </Form.Item>
      <Form.Item label="Show Pagination">
        <Switch
          checked={config.showPagination}
          onChange={(checked) => onConfigChange({ ...config, showPagination: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Sorting">
        <Switch
          checked={config.enableSorting}
          onChange={(checked) => onConfigChange({ ...config, enableSorting: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Filtering">
        <Switch
          checked={config.enableFiltering}
          onChange={(checked) => onConfigChange({ ...config, enableFiltering: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Bar Chart
const BarChartBlock: FeatureBlockRegistration = {
  id: 'bar-chart',
  name: 'Bar Chart',
  description: 'Visualize data using a bar chart with customizable options',
  configSchema: z.object({
    title: z.string().default('Bar Chart'),
    showLegend: z.boolean().default(true),
    barColor: z.string().default('#1890ff'),
    showGridLines: z.boolean().default(true),
    animationDuration: z.number().min(0).max(2000).default(500),
  }),
  defaultConfig: {
    title: 'Bar Chart',
    showLegend: true,
    barColor: '#1890ff',
    showGridLines: true,
    animationDuration: 500,
  },
  icon: <BarChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a bar chart block that visualizes data using bars.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Bar Color: <span style={{ color: config.barColor }}>{config.barColor}</span></li>
          <li>Show Grid Lines: {config.showGridLines ? 'Yes' : 'No'}</li>
          <li>Animation Duration: {config.animationDuration}ms</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Bar Color">
        <Input
          type="color"
          value={config.barColor}
          onChange={(e) => onConfigChange({ ...config, barColor: e.target.value })}
          style={{ width: 100 }}
        />
      </Form.Item>
      <Form.Item label="Show Grid Lines">
        <Switch
          checked={config.showGridLines}
          onChange={(checked) => onConfigChange({ ...config, showGridLines: checked })}
        />
      </Form.Item>
      <Form.Item label="Animation Duration (ms)">
        <InputNumber
          min={0}
          max={2000}
          value={config.animationDuration}
          onChange={(value) => onConfigChange({ ...config, animationDuration: value })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Pie Chart
const PieChartBlock: FeatureBlockRegistration = {
  id: 'pie-chart',
  name: 'Pie Chart',
  description: 'Visualize data distribution using a pie chart',
  configSchema: z.object({
    title: z.string().default('Pie Chart'),
    showLegend: z.boolean().default(true),
    showLabels: z.boolean().default(true),
    showPercentage: z.boolean().default(true),
    donut: z.boolean().default(false),
  }),
  defaultConfig: {
    title: 'Pie Chart',
    showLegend: true,
    showLabels: true,
    showPercentage: true,
    donut: false,
  },
  icon: <PieChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a pie chart block that visualizes data distribution.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Show Labels: {config.showLabels ? 'Yes' : 'No'}</li>
          <li>Show Percentage: {config.showPercentage ? 'Yes' : 'No'}</li>
          <li>Donut Chart: {config.donut ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Labels">
        <Switch
          checked={config.showLabels}
          onChange={(checked) => onConfigChange({ ...config, showLabels: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Percentage">
        <Switch
          checked={config.showPercentage}
          onChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
        />
      </Form.Item>
      <Form.Item label="Donut Chart">
        <Switch
          checked={config.donut}
          onChange={(checked) => onConfigChange({ ...config, donut: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Main Plugin Registration
const FeaturePluginExample: PluginRegistration = {
  id: 'feature-plugin-example',
  name: 'Feature Plugin Example',
  description: 'An example plugin that demonstrates the feature block system',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'feature',
  configSchema: z.object({
    title: z.string().default('Feature Plugin Example'),
    description: z.string().default('This plugin demonstrates the feature block system'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  defaultConfig: {
    title: 'Feature Plugin Example',
    description: 'This plugin demonstrates the feature block system',
    theme: 'system',
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>{config.description}</Paragraph>
      <Divider />
      <Title level={4}>Feature Blocks</Title>
      <Paragraph>
        This plugin includes several feature blocks that can be enabled or disabled individually:
      </Paragraph>
      <ul>
        <li><strong>Data Table</strong>: Display data in a tabular format</li>
        <li><strong>Bar Chart</strong>: Visualize data using a bar chart</li>
        <li><strong>Pie Chart</strong>: Visualize data distribution using a pie chart</li>
      </ul>
      <Paragraph>
        Go to the Feature Blocks tab to manage these blocks.
      </Paragraph>
    </Card>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <Form layout="vertical">
      <Form.Item label="Plugin Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={config.description}
          onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Theme">
        <Select
          value={config.theme}
          onChange={(value) => onConfigChange({ ...config, theme: value })}
          style={{ width: 200 }}
        >
          <Option value="light">Light</Option>
          <Option value="dark">Dark</Option>
          <Option value="system">System (Auto)</Option>
        </Select>
      </Form.Item>
    </Form>
  ),
  featureBlocks: [
    DataTableBlock,
    BarChartBlock,
    PieChartBlock,
  ],
};

export default FeaturePluginExample;import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, InputNumber, Button, Space, Divider } from 'antd';
import { BarChartOutlined, TableOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { PluginRegistration, FeatureBlockRegistration, FeatureBlockRenderProps, FeatureBlockSettingsProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Feature Block: Data Table
const DataTableBlock: FeatureBlockRegistration = {
  id: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format with sorting and filtering capabilities',
  configSchema: z.object({
    columns: z.array(z.string()).default(['Name', 'Value', 'Change']),
    pageSize: z.number().min(5).max(100).default(10),
    showPagination: z.boolean().default(true),
    enableSorting: z.boolean().default(true),
    enableFiltering: z.boolean().default(true),
  }),
  defaultConfig: {
    columns: ['Name', 'Value', 'Change'],
    pageSize: 10,
    showPagination: true,
    enableSorting: true,
    enableFiltering: true,
  },
  icon: <TableOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title="Data Table Block" className="mb-4">
      <Paragraph>
        This is a data table block that displays data in a tabular format.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Columns: {config.columns.join(', ')}</li>
          <li>Page Size: {config.pageSize}</li>
          <li>Show Pagination: {config.showPagination ? 'Yes' : 'No'}</li>
          <li>Enable Sorting: {config.enableSorting ? 'Yes' : 'No'}</li>
          <li>Enable Filtering: {config.enableFiltering ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Page Size">
        <InputNumber
          min={5}
          max={100}
          value={config.pageSize}
          onChange={(value) => onConfigChange({ ...config, pageSize: value })}
        />
      </Form.Item>
      <Form.Item label="Show Pagination">
        <Switch
          checked={config.showPagination}
          onChange={(checked) => onConfigChange({ ...config, showPagination: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Sorting">
        <Switch
          checked={config.enableSorting}
          onChange={(checked) => onConfigChange({ ...config, enableSorting: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Filtering">
        <Switch
          checked={config.enableFiltering}
          onChange={(checked) => onConfigChange({ ...config, enableFiltering: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Bar Chart
const BarChartBlock: FeatureBlockRegistration = {
  id: 'bar-chart',
  name: 'Bar Chart',
  description: 'Visualize data using a bar chart with customizable options',
  configSchema: z.object({
    title: z.string().default('Bar Chart'),
    showLegend: z.boolean().default(true),
    barColor: z.string().default('#1890ff'),
    showGridLines: z.boolean().default(true),
    animationDuration: z.number().min(0).max(2000).default(500),
  }),
  defaultConfig: {
    title: 'Bar Chart',
    showLegend: true,
    barColor: '#1890ff',
    showGridLines: true,
    animationDuration: 500,
  },
  icon: <BarChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a bar chart block that visualizes data using bars.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Bar Color: <span style={{ color: config.barColor }}>{config.barColor}</span></li>
          <li>Show Grid Lines: {config.showGridLines ? 'Yes' : 'No'}</li>
          <li>Animation Duration: {config.animationDuration}ms</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Bar Color">
        <Input
          type="color"
          value={config.barColor}
          onChange={(e) => onConfigChange({ ...config, barColor: e.target.value })}
          style={{ width: 100 }}
        />
      </Form.Item>
      <Form.Item label="Show Grid Lines">
        <Switch
          checked={config.showGridLines}
          onChange={(checked) => onConfigChange({ ...config, showGridLines: checked })}
        />
      </Form.Item>
      <Form.Item label="Animation Duration (ms)">
        <InputNumber
          min={0}
          max={2000}
          value={config.animationDuration}
          onChange={(value) => onConfigChange({ ...config, animationDuration: value })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Pie Chart
const PieChartBlock: FeatureBlockRegistration = {
  id: 'pie-chart',
  name: 'Pie Chart',
  description: 'Visualize data distribution using a pie chart',
  configSchema: z.object({
    title: z.string().default('Pie Chart'),
    showLegend: z.boolean().default(true),
    showLabels: z.boolean().default(true),
    showPercentage: z.boolean().default(true),
    donut: z.boolean().default(false),
  }),
  defaultConfig: {
    title: 'Pie Chart',
    showLegend: true,
    showLabels: true,
    showPercentage: true,
    donut: false,
  },
  icon: <PieChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a pie chart block that visualizes data distribution.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Show Labels: {config.showLabels ? 'Yes' : 'No'}</li>
          <li>Show Percentage: {config.showPercentage ? 'Yes' : 'No'}</li>
          <li>Donut Chart: {config.donut ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Labels">
        <Switch
          checked={config.showLabels}
          onChange={(checked) => onConfigChange({ ...config, showLabels: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Percentage">
        <Switch
          checked={config.showPercentage}
          onChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
        />
      </Form.Item>
      <Form.Item label="Donut Chart">
        <Switch
          checked={config.donut}
          onChange={(checked) => onConfigChange({ ...config, donut: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Main Plugin Registration
const FeaturePluginExample: PluginRegistration = {
  id: 'feature-plugin-example',
  name: 'Feature Plugin Example',
  description: 'An example plugin that demonstrates the feature block system',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'feature',
  configSchema: z.object({
    title: z.string().default('Feature Plugin Example'),
    description: z.string().default('This plugin demonstrates the feature block system'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  defaultConfig: {
    title: 'Feature Plugin Example',
    description: 'This plugin demonstrates the feature block system',
    theme: 'system',
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>{config.description}</Paragraph>
      <Divider />
      <Title level={4}>Feature Blocks</Title>
      <Paragraph>
        This plugin includes several feature blocks that can be enabled or disabled individually:
      </Paragraph>
      <ul>
        <li><strong>Data Table</strong>: Display data in a tabular format</li>
        <li><strong>Bar Chart</strong>: Visualize data using a bar chart</li>
        <li><strong>Pie Chart</strong>: Visualize data distribution using a pie chart</li>
      </ul>
      <Paragraph>
        Go to the Feature Blocks tab to manage these blocks.
      </Paragraph>
    </Card>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <Form layout="vertical">
      <Form.Item label="Plugin Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={config.description}
          onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Theme">
        <Select
          value={config.theme}
          onChange={(value) => onConfigChange({ ...config, theme: value })}
          style={{ width: 200 }}
        >
          <Option value="light">Light</Option>
          <Option value="dark">Dark</Option>
          <Option value="system">System (Auto)</Option>
        </Select>
      </Form.Item>
    </Form>
  ),
  featureBlocks: [
    DataTableBlock,
    BarChartBlock,
    PieChartBlock,
  ],
};

export default FeaturePluginExample;import React from 'react';
import { Card, Typography, Form, Input, Switch, Select, InputNumber, Button, Space, Divider } from 'antd';
import { BarChartOutlined, TableOutlined, PieChartOutlined, LineChartOutlined } from '@ant-design/icons';
import { z } from 'zod';
import { PluginRegistration, FeatureBlockRegistration, FeatureBlockRenderProps, FeatureBlockSettingsProps } from '../types';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Feature Block: Data Table
const DataTableBlock: FeatureBlockRegistration = {
  id: 'data-table',
  name: 'Data Table',
  description: 'Display data in a tabular format with sorting and filtering capabilities',
  configSchema: z.object({
    columns: z.array(z.string()).default(['Name', 'Value', 'Change']),
    pageSize: z.number().min(5).max(100).default(10),
    showPagination: z.boolean().default(true),
    enableSorting: z.boolean().default(true),
    enableFiltering: z.boolean().default(true),
  }),
  defaultConfig: {
    columns: ['Name', 'Value', 'Change'],
    pageSize: 10,
    showPagination: true,
    enableSorting: true,
    enableFiltering: true,
  },
  icon: <TableOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title="Data Table Block" className="mb-4">
      <Paragraph>
        This is a data table block that displays data in a tabular format.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Columns: {config.columns.join(', ')}</li>
          <li>Page Size: {config.pageSize}</li>
          <li>Show Pagination: {config.showPagination ? 'Yes' : 'No'}</li>
          <li>Enable Sorting: {config.enableSorting ? 'Yes' : 'No'}</li>
          <li>Enable Filtering: {config.enableFiltering ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Page Size">
        <InputNumber
          min={5}
          max={100}
          value={config.pageSize}
          onChange={(value) => onConfigChange({ ...config, pageSize: value })}
        />
      </Form.Item>
      <Form.Item label="Show Pagination">
        <Switch
          checked={config.showPagination}
          onChange={(checked) => onConfigChange({ ...config, showPagination: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Sorting">
        <Switch
          checked={config.enableSorting}
          onChange={(checked) => onConfigChange({ ...config, enableSorting: checked })}
        />
      </Form.Item>
      <Form.Item label="Enable Filtering">
        <Switch
          checked={config.enableFiltering}
          onChange={(checked) => onConfigChange({ ...config, enableFiltering: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Bar Chart
const BarChartBlock: FeatureBlockRegistration = {
  id: 'bar-chart',
  name: 'Bar Chart',
  description: 'Visualize data using a bar chart with customizable options',
  configSchema: z.object({
    title: z.string().default('Bar Chart'),
    showLegend: z.boolean().default(true),
    barColor: z.string().default('#1890ff'),
    showGridLines: z.boolean().default(true),
    animationDuration: z.number().min(0).max(2000).default(500),
  }),
  defaultConfig: {
    title: 'Bar Chart',
    showLegend: true,
    barColor: '#1890ff',
    showGridLines: true,
    animationDuration: 500,
  },
  icon: <BarChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a bar chart block that visualizes data using bars.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Bar Color: <span style={{ color: config.barColor }}>{config.barColor}</span></li>
          <li>Show Grid Lines: {config.showGridLines ? 'Yes' : 'No'}</li>
          <li>Animation Duration: {config.animationDuration}ms</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Bar Color">
        <Input
          type="color"
          value={config.barColor}
          onChange={(e) => onConfigChange({ ...config, barColor: e.target.value })}
          style={{ width: 100 }}
        />
      </Form.Item>
      <Form.Item label="Show Grid Lines">
        <Switch
          checked={config.showGridLines}
          onChange={(checked) => onConfigChange({ ...config, showGridLines: checked })}
        />
      </Form.Item>
      <Form.Item label="Animation Duration (ms)">
        <InputNumber
          min={0}
          max={2000}
          value={config.animationDuration}
          onChange={(value) => onConfigChange({ ...config, animationDuration: value })}
        />
      </Form.Item>
    </Form>
  ),
};

// Feature Block: Pie Chart
const PieChartBlock: FeatureBlockRegistration = {
  id: 'pie-chart',
  name: 'Pie Chart',
  description: 'Visualize data distribution using a pie chart',
  configSchema: z.object({
    title: z.string().default('Pie Chart'),
    showLegend: z.boolean().default(true),
    showLabels: z.boolean().default(true),
    showPercentage: z.boolean().default(true),
    donut: z.boolean().default(false),
  }),
  defaultConfig: {
    title: 'Pie Chart',
    showLegend: true,
    showLabels: true,
    showPercentage: true,
    donut: false,
  },
  icon: <PieChartOutlined />,
  render: ({ block, config }: FeatureBlockRenderProps) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>
        This is a pie chart block that visualizes data distribution.
      </Paragraph>
      <div className="mt-4">
        <Text strong>Configuration:</Text>
        <ul>
          <li>Show Legend: {config.showLegend ? 'Yes' : 'No'}</li>
          <li>Show Labels: {config.showLabels ? 'Yes' : 'No'}</li>
          <li>Show Percentage: {config.showPercentage ? 'Yes' : 'No'}</li>
          <li>Donut Chart: {config.donut ? 'Yes' : 'No'}</li>
        </ul>
      </div>
    </Card>
  ),
  renderSettings: ({ block, config, onConfigChange }: FeatureBlockSettingsProps) => (
    <Form layout="vertical">
      <Form.Item label="Chart Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Show Legend">
        <Switch
          checked={config.showLegend}
          onChange={(checked) => onConfigChange({ ...config, showLegend: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Labels">
        <Switch
          checked={config.showLabels}
          onChange={(checked) => onConfigChange({ ...config, showLabels: checked })}
        />
      </Form.Item>
      <Form.Item label="Show Percentage">
        <Switch
          checked={config.showPercentage}
          onChange={(checked) => onConfigChange({ ...config, showPercentage: checked })}
        />
      </Form.Item>
      <Form.Item label="Donut Chart">
        <Switch
          checked={config.donut}
          onChange={(checked) => onConfigChange({ ...config, donut: checked })}
        />
      </Form.Item>
    </Form>
  ),
};

// Main Plugin Registration
const FeaturePluginExample: PluginRegistration = {
  id: 'feature-plugin-example',
  name: 'Feature Plugin Example',
  description: 'An example plugin that demonstrates the feature block system',
  version: '1.0.0',
  author: 'CauldronOS Team',
  category: 'feature',
  configSchema: z.object({
    title: z.string().default('Feature Plugin Example'),
    description: z.string().default('This plugin demonstrates the feature block system'),
    theme: z.enum(['light', 'dark', 'system']).default('system'),
  }),
  defaultConfig: {
    title: 'Feature Plugin Example',
    description: 'This plugin demonstrates the feature block system',
    theme: 'system',
  },
  hasSettings: true,
  hasPermissions: false,
  render: ({ plugin, config, context }) => (
    <Card title={config.title} className="mb-4">
      <Paragraph>{config.description}</Paragraph>
      <Divider />
      <Title level={4}>Feature Blocks</Title>
      <Paragraph>
        This plugin includes several feature blocks that can be enabled or disabled individually:
      </Paragraph>
      <ul>
        <li><strong>Data Table</strong>: Display data in a tabular format</li>
        <li><strong>Bar Chart</strong>: Visualize data using a bar chart</li>
        <li><strong>Pie Chart</strong>: Visualize data distribution using a pie chart</li>
      </ul>
      <Paragraph>
        Go to the Feature Blocks tab to manage these blocks.
      </Paragraph>
    </Card>
  ),
  renderSettings: ({ plugin, config, onConfigChange }) => (
    <Form layout="vertical">
      <Form.Item label="Plugin Title">
        <Input
          value={config.title}
          onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea
          value={config.description}
          onChange={(e) => onConfigChange({ ...config, description: e.target.value })}
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Theme">
        <Select
          value={config.theme}
          onChange={(value) => onConfigChange({ ...config, theme: value })}
          style={{ width: 200 }}
        >
          <Option value="light">Light</Option>
          <Option value="dark">Dark</Option>
          <Option value="system">System (Auto)</Option>
        </Select>
      </Form.Item>
    </Form>
  ),
  featureBlocks: [
    DataTableBlock,
    BarChartBlock,
    PieChartBlock,
  ],
};

export default FeaturePluginExample;