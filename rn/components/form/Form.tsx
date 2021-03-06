import React from 'react';
import { View } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { Picker } from './Picker';
import { TextArea } from './TextArea';
import { CheckBox } from './CheckBox';
import { RadioInput } from './RadioInput';
import { PlacesInput } from './PlacesInput';

export type FormState = {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
};

interface Props {
  children: (formState?: FormState) => JSX.Element[] | JSX.Element;
}

export const Form = <TFormValues extends Record<string, any>>({
  children,
}: Props): JSX.Element => {
  const methods = useForm<TFormValues>({ mode: 'onChange' });

  return (
    <View style={{ flex: 1, padding: 10, marginTop: 10}}>
      <FormProvider {...methods}>{children(methods.formState)}</FormProvider>
    </View>
  );
};

Form.TextInput = TextInput;
Form.Button = Button;
Form.Picker = Picker;
Form.TextArea = TextArea;
Form.CheckBox = CheckBox;
Form.RadioInput = RadioInput;
Form.PlacesInput = PlacesInput;
