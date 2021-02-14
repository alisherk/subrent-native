import React from 'react';
import { HomeScreen } from '..'; 
import { renderWithRedux, createTestProps } from 'test-utils';

it('renders without crashing', async () => {
  let props: any = createTestProps({});
  const { toJSON } = renderWithRedux(< HomeScreen {...props}/>)
  expect(toJSON()).toMatchSnapshot(); 
});