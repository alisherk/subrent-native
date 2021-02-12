import React from 'react';
import { PlacesAutoComplete } from '..';
import { createTestProps } from '../../../test-utils';
import fetchMock from 'jest-fetch-mock';
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';


describe('PlacesAutocomplete component', () => {
  
  afterEach(cleanup);

  const predictions = [{ description: 'Wpg', place_id: '1' }];

  it('renders places autocomplete suggestions', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ predictions, status: 'OK' }));
    const props: any = createTestProps({
      timeToWait: 0,
      placeholderText: 'input',
    });
    const screen = render(<PlacesAutoComplete {...props} />);
    fireEvent.changeText(screen.getByPlaceholderText('input'), 'Wpg');
    await waitFor(() => expect(screen.getByText('Wpg')).toBeTruthy());
  });
});
