import React from 'react';
import { PlacesAutoComplete, PlacesProps } from '../places-autocomplete';
import { Text } from 'react-native-elements';
import { Controller, useFormContext } from 'react-hook-form';
import { Rules } from './types';
import { View } from 'react-native';

export interface PlacesInputProps extends PlacesProps {
  rules: Rules;
  name: string;
  timeToWait?: number;
}

export const PlacesInput = ({
  name,
  requestOptions,
  placeholderText,
  rules,
  timeToWait,
  defaultValue = '',
}: PlacesInputProps): JSX.Element => {
  const { errors, control, setValue } = useFormContext();

  const handleValidate = (text: string | null): void => {
    if (!text) {
      setValue(name, null, { shouldValidate: true });
      return;
    }
    setValue(name, text, { shouldValidate: true });
  };
  return (
    <Controller
      control={control}
      render={() => (
        <View style={{ zIndex: 1, height: 80 }}>
          <PlacesAutoComplete
            requestOptions={requestOptions}
            placeholderText={placeholderText}
            validate={handleValidate}
            timeToWait={timeToWait}
            defaultValue={defaultValue}
          />
          <View style={{ marginLeft: 5 }}>
            {errors[name] && (
              <Text style={{ color: 'red' }}>{errors[name].message}</Text>
            )}
          </View>
        </View>
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};
