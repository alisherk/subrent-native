import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Row, Text, Thumbnail, Col, Card } from 'native-base';
import { getEnvVariables } from 'env';
import { Message } from 'common';

interface TouchableMessageProps {
  messages: Message[];
  onSelect?: (message: Message) => void;
}

export const TouchableMessages = ({
  messages,
  onSelect,
}: TouchableMessageProps) => {
  return (
    <>
      {messages.map((message) => (
        <TouchableOpacity key={message.id} style={styles.container} onPress={() => onSelect?.(message)}>
          <Card style={styles.card}>
            <Row>
              <Thumbnail
                square
                source={{
                  uri: getEnvVariables().emptyAvatar,
                  cache: 'default',
                }}
              />
              <Col>
                <Text>{message.author}</Text>
                <Text note numberOfLines={1}>
                  {message.text}
                </Text>
              </Col>
            </Row>
          </Card>
        </TouchableOpacity>
      ))}
    </>
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
