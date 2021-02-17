import * as app from 'firebase/app';
import * as geofirestore from 'geofirestore';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';
import { getEnvVariables } from 'env';

if (!app.apps.length) {
  app.initializeApp(getEnvVariables().firebaseConfig);
}

class Firebase {
  private static instance: Firebase;
  readonly db: app.firestore.Firestore | any;
  readonly auth: app.auth.Auth;
  readonly functions: app.functions.Functions;
  readonly storage: app.storage.Storage;
  readonly geofirestore: geofirestore.GeoFirestore;

  private constructor() {
    this.db = app.firestore();
    this.auth = app.auth();
    this.functions = app.functions();
    this.storage = app.storage();
    this.geofirestore = geofirestore.initializeApp(this.db);
  }

  public getServerTimestamp(): app.firestore.FieldValue {
    return app.firestore.FieldValue.serverTimestamp();
  }

  public getGeoPoint(lat: number, lng: number): app.firestore.GeoPoint {
    return new app.firestore.GeoPoint(lat, lng);
  }

  public getGoogleAuthProvider(): app.auth.GoogleAuthProvider {
    const googleAuthProvider = new app.auth.GoogleAuthProvider();
    return googleAuthProvider;
  }

  public getGoogleAuthCred(googleUser: any): app.auth.OAuthCredential {
    return app.auth.GoogleAuthProvider.credential(
      googleUser.idToken,
      googleUser.accessToken
    );
  }

  static getInstance(): Firebase {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }
}

export const firebase = Firebase.getInstance();
