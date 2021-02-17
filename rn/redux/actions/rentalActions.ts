import { firebase } from 'gateway';
import { convertToFields, uploadImage } from '../utils';
import { RentalActions, AppThunk, PopulateRentalAction } from './types';
import { getLatLng } from 'components/places-autocomplete';
import { GeoDocumentReference, GeoDocumentSnapshot } from 'geofirestore';
import { getTokenWithUserPermission } from 'utils/getTokenWithUserPermission';
import { Rental } from 'types';
import cuid from 'cuid';

export const populateRental = (rental: Rental): PopulateRentalAction => ({
  type: RentalActions.POPULATE_RENTAL,
  payload: { rental },
});

export interface IUploadRentalParams {
  data: {
    name: string;
    full_day_price: string;
    half_day_price: string;
    description: string;
    category: string;
    confirmation_required: string;
    instructions: string;
    region: string;
  };
  imageUri: string | null;
}

export const uploadRental = (params: IUploadRentalParams): AppThunk => async (
  dispatch,
  getState
) => {
  if (!getState().auth.authedUser?.uid) return;
  const authedUser = getState().auth.authedUser;
  const rentalDocRef = firebase.geofirestore.collection('rentals').doc();
  const path = `${authedUser?.uid}/rental_images`;
  const imageName = `${rentalDocRef.id}_` + cuid();
  try {
    let downloadUrl: string | null = null;
    if (params.imageUri)
      downloadUrl = await uploadImage(
        params.imageUri,
        path,
        imageName,
        firebase.storage
      );

    const latLng = await getLatLng(params.data.region);
    const coordinates = firebase.getGeoPoint(latLng.lat, latLng.lng);
    const search_fields = convertToFields(
      params.data.name,
      params.data.full_day_price,
      params.data.half_day_price
    );
    const expoToken = await getTokenWithUserPermission(); 
     await rentalDocRef.set({
      ...params.data,
      displayName: authedUser?.displayName,
      ownerImage: authedUser?.photoURL,
      image: downloadUrl,
      ownerUid: authedUser?.uid,
      date: firebase.getServerTimestamp(),
      status: 'active',
      search_fields,
      coordinates,
      expoToken
    }); 
  } catch (err) {
    throw err;
  }
};

export interface IUpdateRentalParams {
  data: {
    name: string;
    full_day_price: string;
    half_day_price: string;
    description: string;
    category: string;
    confirmation_required: string;
    instructions: string;
    region: string;
  };
  imageUri: string | null;
  rentalId: string;
  existingImage: string | null;
}

export const updateRental = (params: IUpdateRentalParams): AppThunk => async (
  dispatch,
  getState
) => {
  if (!getState().auth.authedUser?.uid) return;
  const authedUser = getState().auth.authedUser;
  const rentalDocRef = firebase.geofirestore
    .collection('rentals')
    .doc(params.rentalId);
  const path = `${authedUser?.uid}/rental_images`;
  const imageName = `${rentalDocRef.id}_` + cuid();
  try {
    let downloadUrl: string | null = params?.existingImage || null;
    if (params.imageUri)
      downloadUrl = await uploadImage(
        params.imageUri,
        path,
        imageName,
        firebase.storage
      );
    const latLng = await getLatLng(params.data.region);
    const coordinates = firebase.getGeoPoint(latLng.lat, latLng.lng);
    const search_fields = convertToFields(
      params.data.name,
      params.data.full_day_price,
      params.data.half_day_price
    );
    await rentalDocRef.update({
      ...params.data,
      displayName: authedUser?.displayName,
      ownerImage: authedUser?.photoURL,
      image: downloadUrl,
      ownerUid: authedUser?.uid,
      date: firebase.getServerTimestamp(),
      status: 'active',
      search_fields,
      coordinates,
    });
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

export const deleteRental = (rentalId: string): AppThunk => async (
  dispatch,
  getState
): Promise<void> => {
  if (!getState().auth.authedUser?.uid) return;
  const rentalDocRef: GeoDocumentReference = firebase.geofirestore.doc(
    `rentals/${rentalId}`
  );
  try {
    const snapshot: GeoDocumentSnapshot = await rentalDocRef.get();
    if (snapshot.data()?.status === 'rented')
      throw new Error('You can not delete rented equipment.');
    await rentalDocRef.delete();
  } catch (err) {
    throw err;
  }
};
