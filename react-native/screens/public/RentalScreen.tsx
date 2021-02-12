import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { RentalScreenNavigationProp } from '../../navigation';
import { StyleSheet } from 'react-native';
import { MapPreview } from '../../components/map-preview';
import {
  Container,
  Thumbnail,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
} from 'native-base';

interface Props {
  navigation: RentalScreenNavigationProp;
  route: RentalScreenNavigationProp;
}

export const RentalScreen: React.FC<Props> = ({ navigation }) => {
  const rental = useSelector(
    (state: RootState) => state.rentals.fetchedRental!
  );

  const imageUrl = rental?.ownerImage
    ? rental.ownerImage
    : 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png';

  const handlePress = (): void => {
    navigation.navigate('Checkout');
  };

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem bordered>
            <Thumbnail source={{ uri: imageUrl }} />
            <Text style={{ marginLeft: 5 }}>{rental.displayName}</Text>
          </CardItem>
          <CardItem bordered style={styles.priceRow}>
            <Text>Full day: ${`${rental.full_day_price}`}</Text>
            <Text>Half day: ${`${rental.half_day_price}`}</Text>
          </CardItem>
          <CardItem bordered style={styles.rowStyle}>
            <Text>Equipment: {rental.name} </Text>
          </CardItem>
          <CardItem bordered style={styles.rowStyle}>
            <Text>Description: {rental.description}</Text>
          </CardItem>
          <CardItem bordered style={styles.rowStyle}>
            <Text>Region: {rental.region}</Text>
          </CardItem>
          <CardItem bordered style={styles.rowStyle}>
            <Text>
              Delivery:{' '}
              {rental.delivery === 'yes' ? 'Contact owner to arrange' : 'No'}
            </Text>
          </CardItem>
          <CardItem style={styles.bottomRow}>
            <Button onPress={handlePress}>
              <Icon active name='cart' />
              <Text>Rent this equipment </Text>
            </Button>
          </CardItem>
        </Card>
        <MapPreview location={rental.g} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  rowStyle: { height: 50 },
  bottomRow: { justifyContent: 'center' },
  priceRow: { justifyContent: 'space-evenly' },
});
