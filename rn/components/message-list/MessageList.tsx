import React from 'react';
import { TouchableMessage } from './TouchableMessage';
import { MessageItem } from './MessageItem';
import { FlatList } from 'react-native';
import { Message } from 'common';

interface MessageListProps {
  messages: Message[];
  onSelect?: (message: Message) => void;
  touchable?: boolean;
}

type Item = {
  item: Message;
};

export const MessageList = ({
  messages,
  onSelect,
  touchable = false,
}: MessageListProps) => {

  const renderItem = ({ item }: Item) => {
    if (touchable) {
      return (
        <TouchableMessage
          author={item.author}
          text={item.text}
          onSelect={() => onSelect?.(item)}
        />
      );
    }
    return <MessageItem author={item.author} text={item.text} />;
  };
  return <FlatList data={messages} renderItem={renderItem} />;
};
