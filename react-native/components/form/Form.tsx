import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Content, Form as NativeBaseForm } from 'native-base';
import { TextInput, TextInputProps } from './TextInput';
import { Button, ButtonProps } from './Button';
import { Picker, PickerInputProps } from './Picker';
import { TextArea, TextAreaProps } from './TextArea';
import { CheckBox, CheckBoxProps } from './CheckBox';
import { RadioInput, RadioInputProps } from './RadioInput';
import { PlacesInput, PlacesInputProps } from './PlacesInput';


export type FormState = {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean; 
};

interface Props {
  children: (formState: FormState) => JSX.Element[] | JSX.Element;
};

interface NestedComponents {
  TextInput: React.FC<TextInputProps>;
  Button: React.FC<ButtonProps>;
  Picker: React.FC<PickerInputProps>;
  TextArea: React.FC<TextAreaProps>;
  CheckBox: React.FC<CheckBoxProps>;
  RadioInput: React.FC<RadioInputProps>;
  PlacesInput: React.FC<PlacesInputProps>;
};

export const Form: React.FC<Props> & NestedComponents = ({
  children,
}): JSX.Element => {
    
  const methods = useForm({ mode: 'onChange' });

  return (
    <Content padder>
      <FormProvider {...methods}>
          <NativeBaseForm>{children(methods.formState)}</NativeBaseForm>      
      </FormProvider>
    </Content>
  );
};

Form.TextInput = TextInput;
Form.Button = Button;
Form.Picker = Picker;
Form.TextArea = TextArea;
Form.CheckBox = CheckBox;
Form.RadioInput = RadioInput;
Form.PlacesInput = PlacesInput;
