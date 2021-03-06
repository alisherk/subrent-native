import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { flushRentalReducer } from 'redux/actions';
import { RootState } from 'redux/reducers';
import { RentalScreenProps } from 'navigation';
import { StyleSheet } from 'react-native';
import { MapPreview as Map } from 'components/map-preview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Card,
  Text,
  Button,
  Icon,
} from 'react-native-elements';

export const RentalScreen = ({ navigation }: RentalScreenProps) => {
  const dispatch = useDispatch();
  const rental = useSelector((state: RootState) => state.rentals.fetchedRental);
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  useEffect(() => {
    return () => {
      dispatch(flushRentalReducer());
    };
  }, []);

  const handleGoToCheckout = (): void => {
    navigation.navigate('Checkout');
  };

  const handleContactOwnerWithAuth = (): void => {
    if (authedUser) {
      navigation.navigate('Contact Owner');
      return;
    }
    navigation.navigate('Login', { origin: 'Contact Owner' });
  };

  return (
    <View>
        <Card>
          <View>
            {rental?.ownerImage ? (
              <Image source={{ uri: rental.ownerImage }} />
            ) : (
              <Icon name='person' style={styles.icon} />
            )}
            <Text style={styles.text}>{rental?.displayName}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text>Full day: ${`${rental?.full_day_price}`}</Text>
            <Text>Half day: ${`${rental?.half_day_price}`}</Text>
          </View>
          <View>
            <Text>{rental?.name}</Text>
          </View>
          <View>
            <Text> {rental?.description} </Text>
          </View>
          <View style={styles.rowStyle}>
            <Text>{rental?.region}</Text>
          </View>
          <View style={styles.contactOwnerContainer}>
            <View>
              <Text>
                {rental?.confirmation_required === 'yes'
                  ? 'Please contact the owner before renting this item'
                  : "You don't need to contact the owner to rent it"}
              </Text>
            </View>
            <TouchableOpacity onPress={handleContactOwnerWithAuth}>
              <Icon name='mail' style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <Button onPress={handleGoToCheckout}>
              <Icon name='cart' />
              <Text>Rent this equipment </Text>
            </Button>
          </View>
        </Card>
        <Map location={rental?.g} />
      </View>
  );
};

const styles = StyleSheet.create({
  contactOwnerContainer: { justifyContent: 'space-evenly' },
  rowStyle: { height: 50 },
  colStyle: { height: 100, justifyContent: 'space-evenly' },
  bottomRow: { justifyContent: 'center' },
  priceRow: { justifyContent: 'space-evenly' },
  msgBtnText: { color: 'white' },
  text: { marginLeft: 5 },
  icon: {
    color: 'gray',
    margin: 5,
  },
});
