import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCrjQx_F0GLCzx55ynPAcBypsRYHeO_mK4",
    authDomain: "crwn-db-2734d.firebaseapp.com",
    databaseURL: "https://crwn-db-2734d.firebaseio.com",
    projectId: "crwn-db-2734d",
    storageBucket: "crwn-db-2734d.appspot.com",
    messagingSenderId: "628243193598",
    appId: "1:628243193598:web:4082595bd5f586bc9f0faf",
    measurementId: "G-QSVGJFC0WB"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;