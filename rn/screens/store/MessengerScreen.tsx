import React, { useEffect } from 'react';
import { Form } from 'components/form';
import { MessageList } from 'components/message-list';
import { Row, Text } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { getMessages, sendMessage, MessageTypes } from 'redux/actions';
import { RootState } from 'redux/reducers/rootReducer';
import { firebase } from 'gateway';
import { MessagerScreenProps } from 'navigation';

type FormValues = {
  message: string;
};

export const MessengerScreen = ({ route }: MessagerScreenProps) => {
  const dispatch = useDispatch();
  const rentalMessages = useSelector(
    (state: RootState) => state.messages.rentalMessages
  );
  const error = useSelector((state: RootState) => state.messages.error);
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
  
  const query = firebase.db
    .collection('messages')
    .where('rentalId', '==', route.params.rentalId)
    .where('participants', 'array-contains', authedUser?.uid);

  useEffect(() => {
    dispatch(getMessages(query, MessageTypes.RENTAL_MESSAGES));
  }, []);

  const handleSubmit = async ({ message }: FormValues) => {
    try {
      await dispatch(
        sendMessage({
          text: message,
          rentalId: route.params.rentalId,
          participantId: route.params.messageOwnerUid,
          messageType: MessageTypes.RENTAL_MESSAGES,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form<FormValues>>
      {(formState) => (
        <>
          <Row>
            <Form.TextArea name='message' rows={3} rules={{ required: true }} />
          </Row>
          <Row style={{ justifyContent: 'flex-end', marginTop: 10 }}>
            <Form.Button<FormValues>
              buttonName='Send'
              onSubmit={handleSubmit}
              disabled={formState.isSubmitting || !formState.isValid}
            />
          </Row>
          {error ? (
            <Row style={{ justifyContent: 'center', marginTop: 15 }}>
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
