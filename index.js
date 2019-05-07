const admin = require('firebase-admin');
var serviceAccount = require('/path/to/API_KEY.json');

// Initialize Firebase-Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Initialize Firebase Firestore
var db = admin.firestore();

// Import axios for handle the requests
var axios  = require('axios');

// Getting all docs from collection
var query = db.collection('users');
query.onSnapshot(querySnapshot => {
    // Create the listener for each doc
    querySnapshot.docChanges({}).forEach((snapshot) => {
        // Request to URL to handle the data
        axios.post('URL-TO-HANDLE-DATA'+snapshot.doc.id,{
            data: snapshot.doc.data()
        }).then((response) => {
            let data = response.data.data;
            console.log('server',data); // URL Response
        }).catch(err=>{
            console.log(err);
        });
    })
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});
