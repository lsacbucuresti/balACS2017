// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.countVotes = functions.database.ref('/votes/{voted}').onWrite(event => {
  const voted = event.data.key;
  const voter = event.data.val();

  console.log(voter);
  console.log(voted);
  

  return event.data.ref.parent.root.child('total_' + voted).set("sasdasdas");
});