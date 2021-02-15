import React, { useState } from 'react';
import { Row } from 'native-base';
import { Alert, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useDocument } from 'hooks';
import { firebase } from 'gateway';
import { Spinner } from 'components/spinner';
import { Form, PickerOption } from 'components/form';
import { PostRentalScreenNavigationProp } from 'navigation';
import { ImagePreview } from 'components/image-preview';
import { openCamera, getPermission, CAMERA } from '../utils';
import * as actions from 'redux/actions';

interface PostRentalScreenProps {
  navigation: PostRentalScreenNavigationProp;
  route: { params?: { rentalId: string } };
}

interface FormValues {
  name: string;
  full_day_price: string;
  half_day_price: string;
  description: string;
  category: string;
  confirmation_required: string;
  date: Date;
  imageName: string;
  instructions: string;
  region: string;
}

const CategoryOptions: PickerOption[] = [
  { id: 1, label: 'Personal', value: 'personal' },
  { id: 2, label: 'Industrial', value: 'industrial' },
];

const YesNoOptions: PickerOption[] = [
  { id: 1, label: 'Yes', value: 'yes' },
  { id: 2, label: 'No', value: 'no' },
];

export const PostRentalScreen = ({
  route,
  navigation,
}: PostRentalScreenProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const dispatch = useDispatch<actions.AppThunkDispatch>();

  const [doc, status] = useDocument(
    route.params?.rentalId
      ? firebase.db.doc(`rentals/${route.params?.rentalId}`)
      : null,
    []
  );

  const handleSubmit = async (data: FormValues): Promise<void> => {
    const rentalId: string = route.params?.rentalId!;
    try {
      if (rentalId) {
        await dispatch(
          actions.updateRental({
            data,
            imageUri,
            rentalId,
            existingImage: doc?.image!,
          })
        );
      } else await dispatch(actions.uploadRental({ data, imageUri }));
      const message = rentalId
        ? 'Your rental is updated.'
        : 'Your rental is live.';
      Alert.alert('Success', message, [
        {
          text: 'Go back to your rentals',
          onPress: () => navigation.navigate('My Rentals'),
        },
      ]);
    } catch (err) {
      Alert.alert('Oops something went wrong', err.message, [{ text: 'Ok' }]);
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await dispatch(actions.deleteRental(route.params?.rentalId!));
      Alert.alert('Success', 'Your rental is deleted.', [
        {
          text: 'Go to your rentals',
          onPress: () => navigation.navigate('My Rentals'),
        },
      ]);
    } catch (err) {
      Alert.alert('Warning', err.message, [{ text: 'OK' }]);
    }
  };

  const handleOpenCamera = async () => {
    const result = await openCamera({
      getPermission,
      permissions: [CAMERA],
      allowsEditing: true,
    });
    if (result?.cancelled) return;
    const uri = result?.uri || null;
    setImageUri(uri);
  };

  if (status === 'loading') return <Spinner />;

  return (
    <Form>
      {(formState) => (
        <>
          <Form.TextInput
            name='name'
            errMsg='Minimum 4 letter equipment name is required'
            rules={{ required: true, minLength: 4 }}
            label='Equipment name'
            defaultValue={doc?.name}
            testID='input'
          />
          <Form.TextInput
            name='full_day_price'
            label='Full day price'
            errMsg='Full day price must be digits only'
            rules={{ required: true, pattern: /^\d+(\.\d{1,2})?$/ }}
            defaultValue={doc?.full_day_price}
          />
          <Form.TextInput
            name='half_day_price'
            label='Half day price'
            errMsg='Half day price must be digits only'
            rules={{ required: true, pattern: /^\d+(\.\d{1,2})?$/ }}
            defaultValue={doc?.half_day_price}
          />
          <Form.TextInput
            name='description'
            label='Equipment descpription'
            errMsg='Description required'
            rules={{ required: true }}
            defaultValue={doc?.description}
          />
          <Form.TextInput
            name='instructions'
            label='Special instructions'
            errMsg='Instructions are required'
            rules={{ required: true }}
            defaultValue={doc?.instructions}
          />
          <Form.Picker
            name='category'
            headerTitle='Equipment category'
            placeholderText='Select option'
            errMsg='Selection is required'
            rules={{ required: true }}
            options={CategoryOptions}
            defaultValue={doc?.category}
          />
          <Form.Picker
            name='delivery'
            headerTitle='Willing to deliver'
            placeholderText='Select option'
            errMsg='Selection is required'
            rules={{ required: true }}
            options={YesNoOptions}
            defaultValue={doc?.delivery}
          />
          <Form.Picker
            name='confirmation_required'
            headerTitle='Should confirm availability'
            placeholderText='Select option'
            errMsg='Selection is required'
            rules={{ required: true }}
            options={YesNoOptions}
            specialMessage='Yes means contact me before paying'
            defaultValue={doc?.confirmation_required}
          />
          <Form.PlacesInput
            name='region'
            placeholderText='Postal Code or City'
            requestOptions={{ types: '(regions)', components: 'country:can' }}
            rules={{ required: true }}
            errMsg='City or Postal Code is required'
            defaultValue={doc?.region ? doc.region : ''}
          />
          <View
            style={styles.container}
          >
            <ImagePreview
              imagePreviewStyle={styles.imagePreview}
              imageUri={imageUri || doc?.image!}
              handleOnPress={() => setImageUri(null)}
              deleteIcon={doc?.image ? false : true}
            />
            <Form.Button
              icon
              success
              iconRight
              iconName='camera'
              buttonName='Take image'
              handlePress={handleOpenCamera}
            />
          </View>
          {route.params?.rentalId ? (
            <Row style={styles.btnGroupRow}>
              <Form.Button
                disabled={!formState.isValid || formState.isSubmitting}
                buttonName='Update'
                onSubmit={handleSubmit}
              />
              <Form.Button
                light
                disabled={!formState.isValid || formState.isSubmitting}
                buttonName='Delete'
                onSubmit={handleDelete}
                textStyle={styles.deleteBtnText}
              />
            </Row>
          ) : (
            <>
              <Form.Button
                full
                disabled={!formState.isValid || formState.isSubmitting}
                style={styles.submitBtn}
                buttonName='Post Rental'
                onSubmit={handleSubmit}
              />
            </>
          )}
        </>
      )}
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', justifyContent: 'space-evenly'
  },
  submitBtn: {
    marginVertical: 10,
  },
  deleteBtnText: {
    color: 'white',
  },
  btnGroupRow: {
    justifyContent: 'space-evenly', marginVertical: 20
  },
  imagePreview: {
    height: 200, width: 200 
  }
});
