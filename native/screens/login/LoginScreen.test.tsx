import React from 'react';
import { LoginScreen } from './LoginScreen';
import { renderWithRedux, createTestProps } from 'test-utils';
import { cleanup, fireEvent, waitFor } from '@testing-library/react-native';

describe('LoginScreen', () => {
  afterEach(cleanup);
  const props: any = createTestProps({ navigation: { setOptions: jest.fn()}});

  it('switches the screen', async () => {
    const screen = renderWithRedux(<LoginScreen {...props} />);
    fireEvent.press(screen.getByText(/Sign up/));
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Username/)).toBeTruthy();
      expect(screen.getByText(/Go back/)).toBeTruthy();
    });
  });

  it('renders error message on invalid email', async () => {
    const screen = renderWithRedux(<LoginScreen {...props} />);
    const input = screen.getByPlaceholderText(/Email/);
    fireEvent.changeText(input, 'test');
    await waitFor(() =>
      expect(screen.getByText(/Valid email is required/)).toBeTruthy()
    ); 
  });

  it('switches to reset screen', async () => {
    const screen = renderWithRedux(<LoginScreen {...props} />);
    const button = screen.getByText(/Reset/);
    fireEvent.press(button); 
    expect(screen.getByPlaceholderText(/Email/)).toBeTruthy();
    expect(screen.queryByText(/Username/)).toBeNull();
    expect(screen.queryByText(/Password/)).toBeNull();
  });

  it('renders without crashing', async () => {
    const { toJSON } = renderWithRedux(<LoginScreen {...props} />);
    await waitFor(() => Promise.resolve());
    expect(toJSON()).toMatchSnapshot();
  });
});
