import React from 'react';
import { Typography, Button, Space, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import BrandHierarchyShowcase from '../components/BrandHierarchyShowcase';

const { Title, Paragraph } = Typography;

/**
 * BrandHierarchyPage displays the relationship between
 * Pixel Potion (parent brand) and CauldronOS (flagship product).
 */
const BrandHierarchyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <img src="/pixel-potion-combined.svg" alt="Pixel Potion Logo" className="mx-auto mb-6" width={300} />
        <Title level={1} className="font-heading">Brand Hierarchy</Title>
        <Paragraph className="text-lg max-w-2xl mx-auto">
          The relationship between Pixel Potion (parent brand) and CauldronOS (flagship product),
          showing how they work together while maintaining their distinct identities.
        </Paragraph>
        <Space size="middle" className="mt-6">
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            href="/docs/brand-hierarchy.md"
            target="_blank"
          >
            Download Brand Hierarchy Guidelines
          </Button>
        </Space>
      </div>
      
      <Divider />
      
      <BrandHierarchyShowcase />
      
      <Divider />
      
      <div className="text-center mt-12 mb-8">
        <Title level={3} className="font-heading">Benefits of This Hierarchy</Title>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="benefit-card">
              <Title level={4}>Clarity</Title>
              <Paragraph>
                Clearly defines the parent/child relationship between brands.
              </Paragraph>
            </div>
            <div className="benefit-card">
              <Title level={4}>Consistency</Title>
              <Paragraph>
                Both brands share core values but with different flavors.
              </Paragraph>
            </div>
            <div className="benefit-card">
              <Title level={4}>Flexibility</Title>
              <Paragraph>
                Pixel Potion can expand into new areas while CauldronOS stays focused.
              </Paragraph>
            </div>
            <div className="benefit-card">
              <Title level={4}>Depth</Title>
              <Paragraph>
                Creates a rich brand story that can evolve over time.
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandHierarchyPage;

// CSS for this component
const styles = `
.benefit-card {
  padding: 1.5rem;
  background-color: var(--color-bg-elevated);
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.benefit-card h4 {
  color: var(--color-flux-aqua);
}
`;

// Add styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = styles;
  document.head.appendChild(styleElement);
}
