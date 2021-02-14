import React from 'react';
import { DatePicker as NativeBaseDatePicker } from 'native-base';
import { format } from 'date-fns';

interface DatePickerProps {
  transparent: boolean;
  textStyle: { color: string };
  placeholderTextStyle: { color: string };
  onChange(date: Date): void;
}

export const DatePicker = ({
  transparent,
  textStyle,
  placeholderTextStyle,
  onChange,
}: DatePickerProps) => {
  return (
    <NativeBaseDatePicker
    defaultDate={new Date(2018, 4, 4)}
      modalTransparent={transparent}
      animationType={'fade'}
      androidMode={'default'}
      placeHolderText='Select date'
      textStyle={textStyle}
      placeHolderTextStyle={placeholderTextStyle}
      onDateChange={ date => console.log(date)}
    />
  );
};
