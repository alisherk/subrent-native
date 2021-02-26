import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { createStripeSession } from 'gateway/functions';
import { calculate, calculationResult } from './utils';
import { Spinner } from 'components/spinner';
import { RadioInput, RadioOption } from 'components/form';
import { Rental } from 'common';
import { RootState } from 'redux/reducers';
import { CheckoutScreenNavigationProp } from 'navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Container, Text, Content, Button, Card, CardItem } from 'native-base';

const PriceOptions: RadioOption[] = [
  {
    id: 1,
    value: 'full_day_price',
    label: 'Full day',
    color: 'grey',
    selectedColor: 'green',
  },
  {
    id: 2,
    value: 'half_day_price',
    label: 'Half day',
    color: 'grey',
    selectedColor: 'green',
  },
];

interface CheckoutScreenProps {
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenNavigationProp;
}

export enum ActionTypes {
  CALCULATE = 'CALCULATE',
  SET_DATE = 'SET_DATE',
  ON_LOAD = 'ON_LOAD',
  ON_PRICE_CHANGE = 'ON_PRICE_CHANGE',
  FROM = 'fromDate',
  TO = 'toDate',
}

export enum PriceChoices {
  full_day_price = 'full_day_price',
  half_day_price = 'half_day_price',
}

export type State = {
  total: number;
  fromDate: Date;
  toDate: Date;
  duration: number;
  loading: boolean;
  price_choice: string;
};

export type Action =
  | { type: ActionTypes.CALCULATE; rental: Rental }
  | { type: ActionTypes.SET_DATE; dateType: string; value: Date | undefined }
  | { type: ActionTypes.ON_LOAD; loading: boolean }
  | { type: ActionTypes.ON_PRICE_CHANGE; rental: Rental };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.ON_PRICE_CHANGE: {
      let price_choice = PriceChoices.full_day_price;
      let price = action.rental.full_day_price;
      if (state.price_choice === PriceChoices.full_day_price) {
        price_choice = PriceChoices.half_day_price;
        price = action.rental.half_day_price;
      }
      const calculation: calculationResult = calculate(
        state.fromDate,
        state.toDate,
        parseInt(price)
      );
      return {
        ...state,
        price_choice,
        total: calculation ? calculation.total : 0,
        duration: calculation ? calculation.duration : 0,
      };
    }
    case ActionTypes.CALCULATE:
      const price =
        state.price_choice === PriceChoices.full_day_price
          ? action.rental.full_day_price
          : action.rental.half_day_price;
      const calculation: calculationResult = calculate(
        state.fromDate,
        state.toDate,
        parseInt(price)
      );
      return {
        ...state,
        total: calculation ? calculation.total : 0,
        duration: calculation ? calculation.duration : 0,
      };
    case ActionTypes.SET_DATE:
      return {
        ...state,
        [action.dateType]: action.value,
      };
    case ActionTypes.ON_LOAD:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}

const initialState: State = {
  total: 0,
  //need to set hours to the start of the day so that same day evaluation works correctly
  fromDate: new Date(new Date().setHours(0, 0, 0, 0)),
  toDate: new Date(),
  duration: 0,
  loading: false,
  price_choice: PriceChoices.full_day_price,
};

export const CheckoutScreen = ({
  navigation,
}: CheckoutScreenProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const rental = useSelector(
    (state: RootState) => state.rentals.fetchedRental!
  );
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  const handleDateChange = (date: Date | undefined) => (type: string) => {
    dispatch({ type: ActionTypes.SET_DATE, dateType: type, value: date });
  };

  const { fromDate, toDate, total, duration, loading, price_choice } = state;

  useEffect(() => {
    if (!fromDate || !toDate) return;
    dispatch({ type: ActionTypes.CALCULATE, rental });
  }, [fromDate, toDate]);

  const handlePriceChange = (): void => {
    dispatch({ type: ActionTypes.ON_PRICE_CHANGE, rental });
  };

  const handleProceedToNext = async () => {
    if (!authedUser) {
      navigation.navigate('Login', { origin: 'Checkout' });
      return;
    }

    if (rental.confirmation_required === 'yes') {
      navigation.navigate('Contact Owner');
      return;
    }

    if (duration <= 0) {
      return Alert.alert(
        'Incorrect dates',
        'Please ensure that your dates are not on the same date or in the past.',
        [{ text: 'OK', style: 'default' }]
      );
    }
    try {
      dispatch({ type: ActionTypes.ON_LOAD, loading: true });
      const { sessionId } = await createStripeSession({
        duration,
        rentalId: rental.id!,
        timestamp: new Date(fromDate).getTime(),
        price_choice,
      });
      dispatch({ type: ActionTypes.ON_LOAD, loading: false });
      navigation.navigate('Stripe', { sessionId });
    } catch (err) {
      dispatch({ type: ActionTypes.ON_LOAD, loading: false });
      if (err.message === 'You are not authorized. Please login or register.') {
        return Alert.alert('Authentication error', err.message, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Login',
            style: 'destructive',
            onPress: () => navigation.navigate('Login', { origin: 'Checkout' }),
          },
        ]);
      }
      return Alert.alert('Checkout error', err.message, [
        { text: 'Cancel', style: 'cancel' },
      ]);
    }
  };
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem header>
            <RadioInput
              value={price_choice}
              handlePress={handlePriceChange}
              options={PriceOptions}
            />
          </CardItem>
          <CardItem bordered style={styles.row}>
            <Text> From: </Text>
            <DateTimePicker
              style={styles.datePickerStyle}
              display='spinner'
              value={fromDate}
              onChange={(e, date) => handleDateChange(date)(ActionTypes.FROM)}
            />
            <Text> To: </Text>
            <DateTimePicker
              style={styles.datePickerStyle}
              display='inline'
              value={toDate}
              onChange={(e, date) => handleDateChange(date)(ActionTypes.TO)}
            />
          </CardItem>
          <CardItem bordered style={styles.row}>
            <Text> GST: 5% </Text>
          </CardItem>
          <CardItem bordered style={styles.row}>
            <Text> Our fee: 10% </Text>
          </CardItem>
          {loading && <Spinner />}
          <CardItem footer style={styles.bottomRow}>
            <Text> TOTAL: ${total.toFixed(2)} </Text>
            <Button onPress={handleProceedToNext}>
              <Text>
                {rental.confirmation_required === 'yes'
                  ? 'Contact Owner'
                  : 'Proceed to Pay'}
              </Text>
            </Button>
          </CardItem>
          <CardItem footer>
            <Text>
              {rental.confirmation_required === 'yes'
                ? 'You need to contact the owner to confirm availability'
                : "You don't need to contact the owner"}
            </Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: { height: 60 },
  bottomRow: { justifyContent: 'space-between' },
  datePickerStyle: { width: '40%', height: 50 },
});
