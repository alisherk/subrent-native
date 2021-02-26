import React, { useEffect } from 'react';
import { Form } from 'components/form';
import { MessageList } from 'components/message-list/MessageList';
import { ContactOwnerScreenProps } from 'navigation';
import { useSelector, useDispatch } from 'react-redux';
import { contactOwner, getMessages, flushMessageReducer } from 'redux/actions';
import { RootState } from 'redux/reducers';
import { Content, Row, Text } from 'native-base';

type FormValues = {
  message: string;
};

export const ContactOwnerScreen = ({}: ContactOwnerScreenProps): JSX.Element => {
  const dispatch = useDispatch();
  const rental = useSelector((state: RootState) => state.rentals.fetchedRental);
  const messages = useSelector((state: RootState) => state.messages.messages);
  const msgError = useSelector((state: RootState) => state.messages.error);

  useEffect(() => {
    dispatch(getMessages());
    return () => {
      dispatch(flushMessageReducer());
    };
  }, []);

  const handleSubmit = async ({ message }: FormValues) => {
    try {
      await dispatch(contactOwner(message));
      if (rental?.expoToken) {
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            host: 'exp.host',
            accept: 'application/json',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            to: rental.expoToken,
            title: 'Message from customer',
            body: message,
          }),
        });
      }
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
          {msgError ? (
            <Row style={{ justifyContent: 'center', marginTop: 15 }}>
              <Text>{msgError}</Text>
            </Row>
          ) : (
            <MessageList messages={messages} />
          )}
        </Content>
      )}
    </Form>
  );
};
