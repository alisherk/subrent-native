import React from 'react';
import { Form } from 'components/form';
import { ContactOwnerScreenProps } from 'navigation';
import { getEnvVariables } from 'env';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import {
  Content,
  Row,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
} from 'native-base';

type FormValues = {
  message: string;
};

export const ContactOwnerScreen = ({
  navigation,
}: ContactOwnerScreenProps): JSX.Element => {
  const rental = useSelector(
    (state: RootState) => state.rentals.fetchedRental!
  );

  const handleSubmit = (formValues: FormValues) => {
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
        body: formValues.message,
      }),
    });
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
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  square
                  source={{ uri: getEnvVariables().emptyAvatar }}
                />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>
                  Its time to build a difference . .
                </Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      )}
    </Form>
  );
};
