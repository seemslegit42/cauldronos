import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useIntl } from 'umi';
import PageTransition from '@/components/PageTransition';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <PageTransition type="fade" cyberpunk>
      <Result
        status="404"
        title="404"
        subTitle={intl.formatMessage({ id: 'error.notFound' })}
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            {intl.formatMessage({ id: 'error.backHome' })}
          </Button>
        }
      />
    </PageTransition>
  );
};

export default NotFoundPage;