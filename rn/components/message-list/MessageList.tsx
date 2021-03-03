import React from 'react';
import { TouchableMessages } from './TouchableMessages';
import { PlainMessages } from './PlainMessages';
import { Message } from 'common';

interface Props {
  messages: Message[];
  onSelect?: (message: Message) => void;
  touchable?: boolean;
}

const Messages = ({ messages, touchable, onSelect }: Props) => {
  if (touchable) {
    return <TouchableMessages messages={messages} onSelect={onSelect} />;
  }
  return <PlainMessages messages={messages} />;
};

export const MessageList = ({
  messages,
  onSelect,
  touchable = false,
}: Props) => {
  return (
    <Messages messages={messages} touchable={touchable} onSelect={onSelect} />
  );
};
