import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Card, Button, Image } from 'react-native-elements';
import * as actions from 'redux/actions';
import { HomeScreenProps } from 'navigation';

export const HomeScreen = ({ navigation }: HomeScreenProps): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getStoredUserAuth());
  }, []);

  const handleSelect = (category: string): void => {
    navigation.navigate('Category', { category });
  };

  return (
    <ScrollView>
      <Card>
        <Card.Title style={styles.cardTitle}>Personal</Card.Title>
        <Image
          containerStyle={styles.imageContainer}
          source={require('../../assets/personal.jpg')}
        />
        <Card.Divider />
        <Button
          containerStyle={styles.buttonContainer}
          title='Explore'
          onPress={() => handleSelect('personal')}
        />
      </Card>
      <Card>
        <Card.Title style={styles.cardTitle}>Industrial</Card.Title>
        <Image
          containerStyle={styles.imageContainer}
          source={require('../../assets/industrial.jpg')}
        />
        <Card.Divider />
        <Button
          containerStyle={styles.buttonContainer}
          title='Explore'
          onPress={() => handleSelect('industrial')}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: { height: 350 },
  buttonContainer: { width: '100%' },
  cardTitle: { fontSize: 20 },
});
