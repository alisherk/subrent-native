import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Text, Card } from 'react-native-elements';
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
        <TouchableOpacity
          key={message.id}
          style={styles.container}
          onPress={() => onSelect?.(message)}
        >
          <Card>
            <View>
              <Image
                source={{
                  uri: getEnvVariables().emptyAvatar,
                  cache: 'default',
                }}
              />
              <View>
                <Text>{message.author}</Text>
                <Text numberOfLines={1}>{message.text}</Text>
              </View>
            </View>
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
