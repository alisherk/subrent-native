import type firebase from 'firebase'; 

export type Firestore = firebase.firestore.Firestore | FirebaseFirestore.Firestore; 
export type FirebaseUser = firebase.User;
export type QuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>
