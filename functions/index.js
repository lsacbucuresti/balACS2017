// Import the Firebase SDK for Google Cloud Functions.
const functions = require('firebase-functions');
// Import and initialize the Firebase Admin SDK.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.countGirlVotes = functions.database.ref('/girlVotes/{voted}').onWrite(event => {
  const voted = event.data.val()['to'];
  const voter = event.data.val()['from'];
  
  var nodVoturi = event.data.adminRef.parent.root.child('girlTotalVotes/total_' + voted);
  return nodVoturi.transaction(count => {
    if (count === null) {
      return count = 1
    } else {
      return count + 1
    }
  })
});

exports.countBoyVotes = functions.database.ref('/boyVotes/{voted}').onWrite(event => {
  const voted = event.data.val()['to'];
  const voter = event.data.val()['from'];
  
  var nodVoturi = event.data.adminRef.parent.root.child('boyTotalVotes/total_' + voted);
  return nodVoturi.transaction(count => {
    if (count === null) {
      return count = 1
    } else {
      return count + 1
    }
  })
});

const ref = admin.database().ref()

exports.makeMatches = functions.https.onRequest((req, res) => {
  ref.child('users').once('value').then(Snap => {
    Snap.foreach(MySnap => {
      console.log(MySnap.val().meet_data);
      if(MySnap.val().meet_data != undefined) {
        var myval = MySnap.val().meet_data;
        var scores = [];
        ref.child('users').once('value').then(other_person_snap => {
          if(other_person_snap.val().meet_data != undefined) {
            var otherval = other_person_snap.val().meet_data;
            //if(MySnap.)
          }
        });
      }
    });
  })
});