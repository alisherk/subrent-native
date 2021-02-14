import React from 'react';
import { PlacesAutoComplete, PlacesProps } from '../places-autocomplete';
import { Row, Text, View } from 'native-base';
import { Controller, useFormContext, ValidationRules } from 'react-hook-form';

export interface PlacesInputProps extends PlacesProps {
  rules: ValidationRules;
  errMsg: string;
  name: string;
  timeToWait?: number; 
}

export const PlacesInput = ({
  name,
  requestOptions,
  placeholderText,
  rules,
  errMsg,
  timeToWait, 
  defaultValue=''
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
          <Row style={{ marginLeft: 5 }}>
            {errors[name] && <Text style={{ color: 'red' }}>{errMsg}</Text>}
          </Row>
        </View>
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};
