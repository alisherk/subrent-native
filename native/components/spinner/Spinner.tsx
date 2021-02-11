import React from 'react';
import * as NativeBase from 'native-base';

export const Spinner: React.FC = () => {
  return (
    <NativeBase.Grid style={{ alignItems: 'center' }}>
      <NativeBase.Col>
        <NativeBase.Spinner testID='spinner' color='green' />
      </NativeBase.Col>
    </NativeBase.Grid>
  );
};
