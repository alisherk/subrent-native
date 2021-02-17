import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { HomeScreenNavigationProp } from 'navigation';
import { useDispatch } from 'react-redux';
import * as actions from 'redux/actions';
import {
  Card,
  CardItem,
  Container,
  Content,
  Button,
  Text,
  Row,
  H3,
} from 'native-base';

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getStoredUserAuth());
  }, []);

  const handleSelect = (category: string): void => {
    navigation.navigate('Category', { category });
  };

  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem bordered style={{ justifyContent: 'center' }}>
            <H3> Personal </H3>
          </CardItem>
          <CardItem cardBody>
            <Image
              style={styles.image}
              source={require('../../assets/personal.jpg')}
            />
          </CardItem>
          <CardItem>
            <Row style={styles.rowStyle}>
              <Button success onPress={() => handleSelect('personal')}>
                <Text>Explore</Text>
              </Button>
            </Row>
          </CardItem>
        </Card>
        <Card>
          <CardItem bordered style={styles.rowStyle}>
            <H3> Industrial</H3>
          </CardItem>
          <CardItem cardBody>
            <Image
              style={styles.image}
              source={require('../../assets/industrial.jpg')}
            />
          </CardItem>
          <CardItem>
            <Row style={styles.rowStyle}>
              <Button success onPress={() => handleSelect('industrial')}>
                <Text>Explore</Text>
              </Button>
            </Row>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: { width: '100%' },
  rowStyle: { justifyContent: 'center' },
});
