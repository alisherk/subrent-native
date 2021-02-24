import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, Card, CardItem, Button, Content, View } from 'native-base';

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
    <Content padder>
      <Card>
        <TouchableOpacity onPress={() => onSelect(category)}>
          <CardItem bordered style={{ justifyContent: 'center' }}>
            <Text> {name} </Text>
          </CardItem>
          <CardItem cardBody>
            <Image
              style={{ flex: 1, height: 250 }}
              source={{ uri: imageUrl }}
            />
          </CardItem>
          <CardItem bordered style={{ justifyContent: 'space-evenly' }}>
            <Text> Full day: ${`${full_day_price}`} </Text>
            <Text> Half day: ${`${half_day_price}`} </Text>
          </CardItem>
          <View style={{ padding: 10 }}>
            <Button full success onPress={() => onSelect(category)}>
              <Text>{btnName}</Text>
            </Button>
          </View>
        </TouchableOpacity>
      </Card>
    </Content>
  );
};
