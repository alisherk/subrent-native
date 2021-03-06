import { firebase } from 'gateway';
import cuid from 'cuid';
import { convertToFields, uploadImage } from '../utils';
import { getLatLng } from 'components/places-autocomplete';
import { GeoDocumentReference, GeoDocumentSnapshot } from 'geofirestore';
import { getTokenWithUserPermission } from 'utils/getTokenWithUserPermission';
import { Rental } from 'common';
import {
  RentalActionTypes,
  AppThunk,
  PopulateRentalAction,
  FlushRentalAction,
} from './types';

export const populateRental = (rental: Rental): PopulateRentalAction => ({
  type: RentalActionTypes.POPULATE_RENTAL,
  payload: { rental },
});

export const flushRentalReducer = (): FlushRentalAction => ({
  type: RentalActionTypes.FLUSH_RENTAL,
});

export interface UploadRentalArgs {
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

export const uploadRental = (params: UploadRentalArgs): AppThunk => async (
  dispatch,
  getState
) => {
  const authedUser = getState().auth.authedUser;
  if (!authedUser) {
      throw new Error('You are not authorized to access this resource.')
  };
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
      date: firebase.addServerTimestamp(),
      status: 'active',
      search_fields,
      coordinates,
      expoToken,
    });
  } catch (err) {
    throw err;
  }
};

export interface UpdateRentalArgs {
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

export const updateRental = (params: UpdateRentalArgs): AppThunk => async (
  dispatch,
  getState
) => {
  const authedUser = getState().auth.authedUser;
  if (!authedUser) {
      throw new Error('You are not authorized to access this resource.')
  }
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
      date: firebase.addServerTimestamp(),
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
    if (snapshot.data()?.status === 'rented') {
       throw new Error('You can not delete rented equipment.');  
    }
    await rentalDocRef.delete();
  } catch (err) {
    throw err;
  }
};
