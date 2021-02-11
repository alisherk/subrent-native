import React from 'react';
import { RentalScreen } from '..';
import { renderWithRedux, createTestProps, mockRental as fetchedRental } from '../../../test-utils';

it('renders without crashing', async () => {
  let props: any = createTestProps({});
  const { toJSON } = renderWithRedux(<RentalScreen {...props} />, { rentals: { fetchedRental}});
  expect(toJSON()).toMatchSnapshot();
});
