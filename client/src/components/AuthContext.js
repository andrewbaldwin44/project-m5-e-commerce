import React, { createContext, useEffect, useState } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';

export const AuthContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyDfH8YHOiOM7VGirZhy4yN6Uur57FBabLs",
  authDomain: "dream-store-1f8de.firebaseapp.com",
  databaseURL: "https://dream-store-1f8de.firebaseio.com",
  projectId: "dream-store-1f8de",
  storageBucket: "dream-store-1f8de.appspot.com",
  messagingSenderId: "10616335197",
  appId: "1:10616335197:web:1272e25997bfc65ebc56b4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function createUserWithEmail(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

function signInWithEmail(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

const AuthProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  }

  useEffect(() => {
    if (user) {
      fetch('/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          amountDue: '$15'
        }),
      })
      .then(response => response.json())
      .then(data => {
        setAppUser(data.data);
        setMessage(data.message);
      })
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        appUser,
        createUserWithEmail,
        signInWithEmail,
        signInWithGoogle,
        handleSignOut,
        message,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AuthProvider);
