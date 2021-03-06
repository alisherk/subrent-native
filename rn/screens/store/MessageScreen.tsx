import React, { useEffect } from 'react';
import { Text } from 'react-native-elements';
import { MessageList } from 'components/message-list';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages, flushMessageReducer, MessageTypes } from 'redux/actions';
import { RootState } from 'redux/reducers/rootReducer';
import { StyleSheet, View } from 'react-native';
import { firebase } from 'gateway';
import { Message } from 'common';
import { MessageScreenProps } from 'navigation';

export const MessageScreen = ({
  navigation,
}: MessageScreenProps): JSX.Element => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.messages.messages);
  const error = useSelector((state: RootState) => state.messages.error);
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);

  const query = firebase.db
    .collection('messages')
    .where('participants', 'array-contains', authedUser?.uid)
    .where('author', '==', authedUser?.displayName);

  useEffect(() => {
    dispatch(getMessages(query, MessageTypes.MESSAGES));
    return () => {
      dispatch(flushMessageReducer());
    };
  }, []);

  const handleSelect = (message: Message): void => {
    navigation.navigate('Messenger', {
      rentalId: message.rentalId,
      messageOwnerUid: message.authorUid,
    });
  };

  return (
    <View>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <MessageList
          messages={messages}
          touchable={true}
          onSelect={handleSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { justifyContent: 'center', marginTop: 15 },
});
