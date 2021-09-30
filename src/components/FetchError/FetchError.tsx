import React from 'react';

import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Result, Typography } from 'antd';

import style from './FetchError.scss';

interface FetchErrorProps {
  onRetry: ()=> void;
  message?: React.ReactNode;
  textColor?: string;
}
const FetchError: React.FC<FetchErrorProps> = ({
  onRetry,
  message = 'Something went wrong.',
  textColor = '#d9d9d9'
}) => (
  <div data-testid="fetch-error-result" className={style.fetchErrorResult}>
    <Result
      icon={<ExclamationCircleOutlined className={style.icon} />}
      subTitle={
        <span data-testid="fetch-error-body" style={{ color: textColor }}>
          <Typography.Text>{message}</Typography.Text>
          <br />
          <Typography.Text>You can </Typography.Text>
          <Typography.Link data-testid="fetch-error-result-reload" onClick={onRetry}>
            try again
          </Typography.Link>{' '}
          <Typography.Text>or </Typography.Text>
          .
        </span>
      }
    />
  </div>
);

export { FetchError };
