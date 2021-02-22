import React from 'react';
import { Form } from 'components/form';

export const SignUpFields = (): JSX.Element => (
  <>
    <Form.TextInput
      name='username'
      placeholder='Username'
      rules={{ required: 'Username is required' }}
    />
    <Form.TextInput
      name='email'
      autoCapitalize='none'
      placeholder='Email'
      rules={{
        required: 'Email is required',
        pattern: {
          value: /^[a-z\d.-]+@[a-z\d.-]+\.[a-z]{2,3}$/,
          message: 'Email appears incorrect',
        },
      }}
    />
    <Form.TextInput
      name='password'
      placeholder='Password'
      secureTextEntry={true}
      rules={{
        required: 'Valid password is required',
        pattern: {
          value: /^.{6,}$/,
          message: 'Password must be at least 6 characters long',
        },
      }}
    />
  </>
);
