import React from 'react';
import { renderWithRedux, createTestProps } from 'test-utils';
import { fireEvent } from '@testing-library/react-native';
import { ManageRentalScreen } from '../ManageRentalScreen';
import * as hooks from 'hooks/usePaginateQuery';

describe('ManageRentalScreen', () => {

  const props: any = createTestProps({});
  it('renders empty message', async () => {
    jest.spyOn(hooks, 'usePaginateQuery').mockReturnValue({} as any);
    const screen = renderWithRedux(<ManageRentalScreen {...props} />);
    expect(screen.getByText(/Time to post new rentals!/)).toBeTruthy();
  });

  it('calls more rentals on scroll', async () => {
    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };
    const loadMore = jest.fn();
    const rentals = [{ id: '1', name: 'test1' }, { id: '2', name: 'test2'}];
    jest
      .spyOn(hooks, 'usePaginateQuery')
      .mockReturnValue({ rentals, loadMore, hasMore: true } as any);
    const screen = renderWithRedux(<ManageRentalScreen {...props} />);
    fireEvent.scroll(screen.getByTestId('flatlist'), eventData);
    expect(loadMore).toHaveBeenCalled(); 
  });

  it('renders a card', async () => {
    const rentals = [{ id: 1, name: 'test' }];
    jest.spyOn(hooks, 'usePaginateQuery').mockReturnValue({ rentals } as any);
    const screen = renderWithRedux(<ManageRentalScreen {...props} />);
    expect(screen.getByText(/test/)).toBeTruthy();
  });
});
