import React, { useState } from 'react';
import { Item, Input, Text, Icon, View } from 'native-base';
import { queryStringify, debounce } from 'screens/utils';
import { getEnvVariables } from 'env';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Alert,
  FlatList,
  StyleSheet,
  ViewStyle,
  Keyboard,
  NativeSyntheticEvent,
  TextStyle,
  TextInputKeyPressEventData,
  YellowBox
} from 'react-native';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
])

const apiKey = getEnvVariables().firebaseConfig.apiKey;

export interface PlacesProps {
  requestOptions: {
    types: string; //['(regions)']
    components: string; //components: { country: 'can' }
  };
  placeholderText?: string;
  timeToWait?: number;
  validate?: (text: string | null) => void;
  defaultValue: string; 
}

export type Prediction = {
  description: string;
  matched_substrings: Array<{ length: number; offset: number }>;
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text_matched_substrings: Array<{ length: number; offset: number }>;
    main_text: string;
    secondary_text: string;
  };
  terms: Array<{ offset: number; value: string }>;
  types: Array<string>;
};

export interface Suggestion {
  status: string;
  predictions: Prediction[];
}

export const PlacesAutoComplete = ({
  requestOptions,
  placeholderText,
  defaultValue, 
  validate,
  timeToWait = 600,
}: PlacesProps): JSX.Element => {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [value, setValue] = useState<string>(defaultValue);

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&${queryStringify(
    requestOptions
  )}&input=`;

  const abortController = new AbortController();

  const request = debounce((value: string) => {
    fetch(url + value, { signal: abortController.signal })
      .then((data) => data.json())
      .then((result: Suggestion) => {
        if (result.status === 'OK') setSuggestion(result);
        else setSuggestion(null);
      })
      .catch((err) => {
        if (err.message === 'Aborted') {
          setSuggestion(null);
          return;
        }
        Alert.alert('Error', err.message, [{ text: 'OK', style: 'default' }]);
      });
  }, timeToWait);

  const handleOnPress = (text: string): void => {
    Keyboard.dismiss();
    setValue(text);
    validate?.(text);
    setSuggestion(null);
  };

  const handleOnChange = async (text: string) => {
    setValue(text);
    request(text);
    validate?.(text);
  };

  const handleCancelFetch = (e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key === 'Backspace') abortController.abort();
  };

  const renderRow = (value: string): JSX.Element => (
    <TouchableOpacity onPress={() => handleOnPress(value)}>
      <View style={styles.separator}>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleClear = (): void => {
    setValue('');
    setSuggestion(null);
    validate?.(null);
  };

  const renderFlatlist = (): JSX.Element => {
    return (
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        data={suggestion?.predictions}
        renderItem={({ item }) => renderRow(item.description)}
        keyExtractor={(item) => item.place_id}
        style={styles.flatList}
      />
    );
  };

  return (
    <>
      <Item>
        <Input
          placeholder={placeholderText}
          value={value}
          onChangeText={handleOnChange}
          onKeyPress={handleCancelFetch}
        />
        <TouchableOpacity onPress={handleClear}>
          <Icon name='close-circle' style={styles.icon} />
        </TouchableOpacity>
      </Item>
      {suggestion && renderFlatlist()}
    </>
  );
};

interface Styles {
  flatList: ViewStyle;
  separator: ViewStyle;
  icon: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  separator: {
    padding: 13,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  flatList: {
    position: 'absolute',
    backgroundColor: '#DCDCDC',
    zIndex: 1,
    width: '100%',
    minHeight: 150,
    marginTop: 50,
  },
  icon: {
    color: 'grey',
  },
});
