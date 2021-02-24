import React from 'react';
import { CategoryScreen } from '..';
import { renderWithRedux, createTestProps, mockPaginateHookReturn } from 'test-utils';
import * as hooks from 'hooks/usePaginateQuery';

it('renders without crashing', () => {
  jest.spyOn(hooks, 'usePaginateQuery').mockReturnValue(mockPaginateHookReturn);
  const props: any = createTestProps({});
  const { toJSON } = renderWithRedux(<CategoryScreen {...props} />);
  expect(toJSON()).toMatchSnapshot(); 
});
