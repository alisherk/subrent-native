import React, { useEffect } from 'react';
import { Form } from 'components/form';
import { MessageList } from 'components/message-list';
import { useSelector, useDispatch } from 'react-redux';
import { contactOwner, getMessages, flushMessageReducer, MessageTypes } from 'redux/actions';
import { RootState } from 'redux/reducers';
import { Content, Row, Text } from 'native-base';
import { firebase } from 'gateway';
import { sendNotification } from 'utils/sendNotification';
import { ContactOwnerScreenProps } from 'navigation';

type FormValues = {
  message: string;
};

export const ContactOwnerScreen = ({
  route,
}: ContactOwnerScreenProps): JSX.Element => {
  const dispatch = useDispatch();
  const rental = useSelector((state: RootState) => state.rentals.fetchedRental);
  const rentalMessages = useSelector((state: RootState) => state.messages.rentalMessages);
  const error = useSelector((state: RootState) => state.messages.error);
  const authedUser = useSelector((state: RootState) => state.auth.authedUser);
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

  const handleSubmit = async ({ message }: FormValues) => {
    try {
      await dispatch(
        contactOwner({
          text: message,
          rentalId: rental?.id,
          secondaryPartId: rental?.ownerUid,
          messageType: MessageTypes.RENTAL_MESSAGES
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
        <Content>
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
        </Content>
      )}
    </Form>
  );
};
