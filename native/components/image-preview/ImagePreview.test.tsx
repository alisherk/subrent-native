import React from 'react';
import { ImagePreview } from './ImagePreview';
import { createTestProps } from 'test-utils';
import { render, cleanup, fireEvent } from '@testing-library/react-native';

describe('ImagePreview component', () => {

  afterEach(cleanup); 

  it('matches snapshot', async () => {
    const props: any = createTestProps({});
    const screen = render(<ImagePreview {...props} />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('renders message initially', () => {
    const props: any = createTestProps({});
    const { getByText } = render(<ImagePreview {...props} />);
    expect(getByText(/No image picked yet/)).toBeTruthy();
  });

  it('displays image when imageUri provided', () => {
    const props: any = createTestProps({ imageUri: 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg' });
    const screen = render(<ImagePreview {...props} />);
    expect(screen.getByTestId('image')).toBeTruthy();
  });

  it('calls handleOnPress', async () => {
    const handleOnPress = jest.fn();
    const props: any = createTestProps({ imageUri: 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg', handleOnPress, deleteIcon: true });
    const screen = render(<ImagePreview {...props} />);
    fireEvent.press(screen.getByTestId('touchable')); 
    expect(handleOnPress).toBeCalled(); 
  });

});

