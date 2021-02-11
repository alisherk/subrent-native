import React from 'react';
import { DatePicker as NativeBaseDatePicker } from 'native-base';
import { format } from 'date-fns';

interface Props {
  transparent: boolean;
  textStyle: { color: string };
  placeholderTextStyle: { color: string };
  onChange(date: Date): void;
}

export const DatePicker: React.FC<Props> = ({
  transparent,
  textStyle,
  placeholderTextStyle,
  onChange,
}) => {
  return (
    <NativeBaseDatePicker
      modalTransparent={transparent}
      animationType={'fade'}
      androidMode={'default'}
      placeHolderText='Select date'
      textStyle={textStyle}
      placeHolderTextStyle={placeholderTextStyle}
      onDateChange={onChange}
      formatChosenDate={(date) => format(date, 'MMM d, yyyy')}
    />
  );
};
