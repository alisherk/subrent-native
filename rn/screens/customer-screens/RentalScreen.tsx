import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { RentalScreenProps } from 'navigation';
import { StyleSheet, Platform } from 'react-native';
import { MapPreview as Map } from 'components/map-preview';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Container,
  Thumbnail,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Row,
} from 'native-base';

export const RentalScreen = ({ navigation }: RentalScreenProps) => {
  const rental = useSelector(
    (state: RootState) => state.rentals.fetchedRental
  );
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

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
    <Container>
      <Content padder>
        <Card>
          <CardItem bordered>
            {rental?.ownerImage ? (
              <Thumbnail source={{ uri: rental.ownerImage }} />
            ) : (
              <Icon name='person' style={styles.icon} />
            )}
            <Text style={styles.text}>{rental?.displayName}</Text>
          </CardItem>
          <CardItem bordered style={styles.priceRow}>
            <Text>Full day: ${`${rental?.full_day_price}`}</Text>
            <Text>Half day: ${`${rental?.half_day_price}`}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{rental?.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text> {rental?.description} </Text>
          </CardItem>
          <CardItem bordered style={styles.rowStyle}>
            <Text>{rental?.region}</Text>
          </CardItem>
          <CardItem bordered style={styles.contactOwnerContainer}>
            <Row>
              <Text>
                {rental?.confirmation_required === 'yes'
                  ? 'Please contact the owner before renting this item'
                  : "You don't need to contact the owner to rent it"}
              </Text>
            </Row>
            <TouchableOpacity onPress={handleContactOwnerWithAuth}>
              <Icon name='mail' style={styles.icon} />
            </TouchableOpacity>
          </CardItem>
          <CardItem style={styles.bottomRow}>
            <Button onPress={handleGoToCheckout}>
              <Icon active name='cart' />
              <Text>Rent this equipment </Text>
            </Button>
          </CardItem>
        </Card>
        <Map location={rental?.g} />
      </Content>
    </Container>
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
    color: Platform.OS === 'android' ? 'white' : 'gray',
    margin: 5,
  },
});
