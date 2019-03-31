
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBpMgeInHxSg3qy8xnr1xKiEQF_D3Q22YQ",
    authDomain: "pullups-norge.firebaseapp.com",
    databaseURL: "https://pullups-norge.firebaseio.com",
    projectId: "pullups-norge",
    storageBucket: "pullups-norge.appspot.com",
    messagingSenderId: "749783225808"
};
firebase.initializeApp(config);

var db = firebase.firestore();

const collectionRef = db.collection("parks");
let cityInput = document.querySelector("#city");
let nameInput = document.querySelector("#name");
let descriptionInput = document.querySelector("#description");
//let imageInput = document.querySelector("#picture"); not relevant yet
let longitudeInput = document.querySelector("#longitude");
let latitudeInput = document.querySelector("#latitude");
let submitButton = document.querySelector("#submit_form");

submitButton.addEventListener("click", function() {
    collectionRef.doc().set({
        city: cityInput.value,
        name: nameInput.value,
        description: descriptionInput.value,
        longitude: longitudeInput.value,
        latitude: latitudeInput.value
    }).then(()=>console.log("Object sent!")
    ).catch((error)=>console.log("Got an error: ", error)
    );
});
