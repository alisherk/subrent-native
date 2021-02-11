import React from 'react';
import { CategoryScreen } from '..';
import { firebase } from 'firebase/index';
import { renderWithRedux, createTestProps, mockPaginateHookReturn } from '../../../test-utils';
import * as hooks from 'hooks/usePaginateQuery';

it('renders without crashing', () => {
  //@ts-ignore
  firebase.db.collection = jest.fn(() => ({ where: jest.fn }));
  jest.spyOn(hooks, 'usePaginateQuery').mockReturnValue(mockPaginateHookReturn);
  const props: any = createTestProps({ route: { params: { category: true }}});
  const { toJSON } = renderWithRedux(<CategoryScreen {...props} />);
  expect(toJSON()).toMatchSnapshot(); 
});
