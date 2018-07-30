// React Firebase specific package
import Rebase from 're-base';
// Official Firebase package
import firebase from 'firebase';

// Configure application
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAUYpYY65CK7xFHtNljl4k3z-_vHdav1VM',
  authDomain: 'catch-of-the-day-27c7a.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-27c7a.firebaseio.com'
});

// Create rebase bindings
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;