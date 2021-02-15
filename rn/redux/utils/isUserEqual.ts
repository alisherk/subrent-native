export const isUserEqual = (googleUser: any, firebaseUser: firebase.User, firebase: any) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (providerData[i]?.providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i]?.uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }