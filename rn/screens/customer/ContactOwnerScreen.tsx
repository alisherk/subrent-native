import React, { useEffect, useState } from 'react';
import { Form } from 'components/form';
import { MessageList } from 'components/message-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/reducers/rootReducer';
import { Content, Row, Text, Switch } from 'native-base';
import { firebase } from 'gateway';
import { sendNotification } from 'utils/sendNotification';
import { getTokenWithUserPermission } from 'utils/getTokenWithUserPermission';
import { ContactOwnerScreenProps } from 'navigation';
import { StyleSheet } from 'react-native';
import {
  sendMessage,
  getMessages,
  flushMessageReducer,
  MessageTypes,
} from 'redux/actions';

type FormValues = {
  message: string;
};

export const ContactOwnerScreen = ({
  route,
}: ContactOwnerScreenProps): JSX.Element => {
  const dispatch = useDispatch();
  const [notififications, toggleNotifications] = useState<boolean>(false);
  const [expoToken, setExpoToken] = useState<string | null>(null);
  const rental = useSelector((state: RootState) => state.rentals.fetchedRental);
  const error = useSelector((state: RootState) => state.messages.error);
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
  const rentalMessages = useSelector(
    (state: RootState) => state.messages.rentalMessages
  );

  const query = firebase.db
    .collection('messages')
    .where('rentalId', '==', rental?.id)
    .where('participants', 'array-contains', authedUser?.uid);

  useEffect(() => {
    dispatch(getMessages(query, MessageTypes.RENTAL_MESSAGES));
    return () => {
      dispatch(flushMessageReducer());
    };
  }, []);

  const handleNotifications = async (): Promise<void> => {
    toggleNotifications((prevState) => !prevState);
    if (expoToken) {
      setExpoToken(null);
      return;
    }
    const newExpoToken = await getTokenWithUserPermission();
    if(newExpoToken) setExpoToken(newExpoToken);
  };

  const handleSubmit = async ({ message }: FormValues) => {
    try {
      await dispatch(
        sendMessage({
          text: message,
          rentalId: rental?.id,
          rentalName: rental?.name,
          participantId: rental?.ownerUid,
          messageType: MessageTypes.RENTAL_MESSAGES,
          expoToken: expoToken,
        })
      );
      await sendNotification({
        token: rental?.expoToken,
        title: 'Inquiry from customer',
        message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form<FormValues>>
      {(formState) => (
        <>
          <Row style={styles.notificationToggle}>
            <Switch
              value={notififications}
              onValueChange={handleNotifications}
            />
            <Text> Allow notifications </Text>
          </Row>
          <Row>
            <Form.TextArea name='message' rows={3} rules={{ required: true }} />
          </Row>
          <Row style={styles.sendButton}>
            <Form.Button<FormValues>
              buttonName='Send'
              onSubmit={handleSubmit}
              disabled={formState.isSubmitting || !formState.isValid}
            />
          </Row>
          {error ? (
            <Row style={styles.error}>
              <Text>{error}</Text>
            </Row>
          ) : (
            <MessageList messages={rentalMessages} />
          )}
        </>
      )}
    </Form>
  );
};

const styles = StyleSheet.create({
  error: {
    justifyContent: 'center',
    marginTop: 15,
  },
  notificationToggle: {
    margin: 15,
  },
  sendButton: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
