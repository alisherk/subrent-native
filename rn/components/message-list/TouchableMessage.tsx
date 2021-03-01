import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Row, Text, Thumbnail, Col, Card } from 'native-base';
import { getEnvVariables } from 'env';

interface TouchableMessageProps {
  author: string;
  text: string;
  onSelect: () => void;
}

export const TouchableMessage = ({ author, text, onSelect }: TouchableMessageProps) => {
    return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Card style={styles.card}>
        <Row>
          <Thumbnail square source={{ uri: getEnvVariables().emptyAvatar, cache: 'only-if-cached' }} />
          <Col>
            <Text>{author}</Text>
            <Text note numberOfLines={1}>
              {text}
            </Text>
          </Col>
        </Row>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  card: {
    paddingVertical: 7,
  },
});
