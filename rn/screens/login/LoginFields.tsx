import React from 'react';
import { Form } from 'components/form';
import { Text, Row } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface LoginFieldProps {
  onPress?: () => void;
}

export const LoginFields = ({ onPress }: LoginFieldProps): JSX.Element => (
  <>
    <Form.TextInput
      autoCapitalize='none'
      name='email'
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
    <Row style={{ justifyContent: 'flex-end', marginBottom: 15 }}>
      <TouchableOpacity onPress={onPress}>
        <Text> Forgot password?</Text>
      </TouchableOpacity>
    </Row>
  </>
);
