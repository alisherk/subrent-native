import React from 'react';
import { PostRentalScreen } from '../PostRentalScreen';
import { renderWithRedux, createTestProps } from 'test-utils';
import {
  fireEvent,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react-native';
import * as hooks from 'hooks/useDocument';
jest.mock('firebase');

describe('PostRentalScreen', () => {
  afterEach(cleanup);

  const props: any = createTestProps({ route: { params: { rentalId: '1' } } });

  it('validates textinput', async () => {
    jest.spyOn(hooks, 'useDocument').mockReturnValue([{ name: 'test' }] as any);
    const screen = renderWithRedux(<PostRentalScreen {...props} />);
    act(() => {
      fireEvent.changeText(screen.getByTestId('inputForName'), 'ac');
    });
    await waitFor(() => expect(screen.getByTestId('error')).toBeTruthy())
  });

  it('has initial value when internal hook returns value', async () => {
    jest.spyOn(hooks, 'useDocument').mockReturnValue([{ name: 'test' }] as any);
    const screen = renderWithRedux(<PostRentalScreen {...props} />);
    await waitFor(() => Promise.resolve());
    expect(screen.getByTestId('inputForName').props.value).toBe('test');
  });

  it('displays spinner initially', async () => {
    jest
      .spyOn(hooks, 'useDocument')
      .mockReturnValue([{ name: 'test' }, 'loading'] as any);
    const screen = renderWithRedux(<PostRentalScreen {...props} />);
    expect(screen.getByTestId('spinner')).toBeTruthy();
  });

  it('displays one of the picker inputs', async () => {
    jest.spyOn(hooks, 'useDocument').mockReturnValue([{ name: 'test' }] as any);
    const screen = renderWithRedux(<PostRentalScreen {...props} />);
    await waitFor(() => Promise.resolve());
    expect(screen.getByText(/Should confirm availability/)).toBeTruthy();
  });

  it('displays delete and update button', async () => {
    jest.spyOn(hooks, 'useDocument').mockReturnValue([{ name: 'test' }] as any);
    const screen = renderWithRedux(<PostRentalScreen {...props} />);
    await waitFor(() => Promise.resolve());
    expect(screen.getByText(/Delete/)).toBeTruthy();
    expect(screen.getByText(/Update/)).toBeTruthy();
  });
});

/* jest.mock('../../../hooks/useDocument', () => ({
    useDocument: () => [{ name: 'test'}, 'loading']
})); */
