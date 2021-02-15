import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { RentalScreenNavigationProp } from 'navigation';
import { StyleSheet, Platform } from 'react-native';
import { MapPreview as Map } from 'components/map-preview';
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

interface RentalScreenProps {
  navigation: RentalScreenNavigationProp;
  route: RentalScreenNavigationProp;
}

export const RentalScreen = ({ navigation }: RentalScreenProps) => {
  const rental = useSelector(
    (state: RootState) => state.rentals.fetchedRental!
  );

  const handlePress = (): void => {
    navigation.navigate('Checkout');
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
            <Text style={{ marginLeft: 5 }}>{rental.displayName}</Text>
          </CardItem>
          <CardItem bordered style={styles.priceRow}>
            <Text>Full day: ${`${rental.full_day_price}`}</Text>
            <Text>Half day: ${`${rental.half_day_price}`}</Text>
          </CardItem>
          <CardItem bordered>
            <Text>{rental.name}</Text>
          </CardItem>
          <CardItem bordered>
            <Text> {rental.description} </Text>
          </CardItem>
          <CardItem bordered style={styles.rowStyle}>
            <Text>{rental.region}</Text>
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-evenly' }}>
            <Row>
              <Text>
                {rental.delivery === 'yes'
                  ? 'Please contact the owner before renting this item'
                  : "You don't need to contact the owner to rent it"}
              </Text>
            </Row>
            {rental.delivery === 'yes' ? (
              <Button light>
                <Text style={styles.msgBtnText}>Message</Text>
              </Button>
            ) : null}
          </CardItem>
          <CardItem style={styles.bottomRow}>
            <Button onPress={handlePress}>
              <Icon active name='cart' />
              <Text>Rent this equipment </Text>
            </Button>
          </CardItem>
        </Card>
        <Map location={rental.g} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  rowStyle: { height: 50 },
  colStyle: { height: 100, justifyContent: 'space-evenly' },
  bottomRow: { justifyContent: 'center' },
  priceRow: { justifyContent: 'space-evenly' },
  msgBtnText: { color: 'white' },
  icon: {
    color: Platform.OS === 'android' ? 'white' : 'black',
  },
});
