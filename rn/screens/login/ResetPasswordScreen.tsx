import React from 'react';
import { Form } from 'components/form';

export const ResetPasswordScreen = (): JSX.Element => (
  <Form.TextInput
    name='email'
    placeholder='Email'
    autoCapitalize='none'
    rules={{
      required: 'Email is required',
      pattern: {
        value: /^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,3}$/,
        message: 'Valid email is required',
      },
    }}
  />
);
