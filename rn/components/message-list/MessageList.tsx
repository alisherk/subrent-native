import React from 'react';
import { Message } from './Message';
import { List } from 'native-base';
import { Message as MessageType } from 'common';

interface MessageListProps {
  messages: MessageType[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <List>
      {messages.map(({ id, author, text }) => (
        <Message key={id} author={author} text={text} />
      ))}
    </List>
  );
};
