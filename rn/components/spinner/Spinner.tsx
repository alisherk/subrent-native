import React from 'react';
import { Grid, Col, Spinner as NativeBaseSpinner } from 'native-base';

export const Spinner = (): JSX.Element => {
  return (
    <Grid style={{ alignItems: 'center' }}>
      <Col>
        <NativeBaseSpinner testID='spinner' color='green' />
      </Col>
    </Grid>
  );
};
