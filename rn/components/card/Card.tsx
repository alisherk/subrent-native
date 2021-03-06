import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Card, Button } from 'react-native-elements';

interface CardProps {
  name: string;
  image: string;
  btnName: string;
  category: string;
  full_day_price: string;
  half_day_price: string;
  onSelect<T>(param: T): void;
}

export const CardComponent = ({
  name,
  image,
  btnName,
  category,
  full_day_price,
  half_day_price,
  onSelect,
}: CardProps): JSX.Element => {
  const imageUrl = image
    ? image
    : 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg';

  return (
    <Card>
      <TouchableOpacity onPress={() => onSelect(category)}>
        <Card.Title style={styles.text}> {name} </Card.Title>
        <Card.Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.contentContainer}>
          <Text style={styles.text}> Full day: ${`${full_day_price}`} </Text>
          <Text style={styles.text}> Half day: ${`${half_day_price}`} </Text>
        </View>

        <Button title={btnName} onPress={() => onSelect(category)} />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: { height: 250 },
  contentContainer: { padding: 10, alignItems: 'center' },
  text: { fontSize: 16 },
});
