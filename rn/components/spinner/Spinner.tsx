import React from 'react';
import * as NativeBase from 'native-base';

export const Spinner = (): JSX.Element => {
  return (
    <NativeBase.Grid style={{ alignItems: 'center' }}>
      <NativeBase.Col>
        <NativeBase.Spinner testID='spinner' color='green' />
      </NativeBase.Col>
    </NativeBase.Grid>
  );
};
