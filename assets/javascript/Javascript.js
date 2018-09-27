// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEdzQBdr40iDU92t9hFhh9lfDD4oQxiCE",
  authDomain: "classwork-3a470.firebaseapp.com",
  databaseURL: "https://classwork-3a470.firebaseio.com",
  projectId: "classwork-3a470",
  storageBucket: "classwork-3a470.appspot.com",
  messagingSenderId: "569893662368"
};
firebase.initializeApp(config);

// variables
var database = firebase.database();
var train = "";
var destination = "";
var firstTrain = "";
var frequency = "";

// Capture Button Click
$("#train-form").on("submit", function (event) {
  // Don't refresh the page!
  event.preventDefault();
  console.log("submit");

  // Capture user inputs and store them into variables
  var trainInput = $("#train-name").val().trim();
  var destinationInput = $("#destination").val().trim();
  var firstTrainInput = $("#first-train").val().trim();
  var frequencyInput = $("#frequency").val().trim();

  var firstTrainConverted = moment(firstTrainInput, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

  var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var remainder = diffTime % frequencyInput;
    console.log(remainder);


    // Minute Until Train
    var minutesAwayInput = frequencyInput - remainder;
    console.log("MINUTES TILL TRAIN: " + minutesAwayInput);

    // Next Train
    var nextTrainInput = moment().add(minutesAwayInput, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainInput).format("hh:mm"));

  if (!trainInput || !destinationInput || !firstTrainInput || !frequencyInput){
    return false;
  }

  // Console log each of the user inputs to confirm we are receiving them
  console.log(trainInput);
  console.log(destinationInput);
  console.log(firstTrainInput);
  console.log(frequencyInput);

  database.ref("train").push({
    train: trainInput,
    destination: destinationInput,
    frequency: frequencyInput,
    minutesAway: minutesAwayInput,
    nextTrain: moment(nextTrainInput).format("hh:mm"),
    
  })});

  database.ref("train").on("child_added", function (childSnapshot) {

    // Print the initial data to the console.
    console.log(childSnapshot.val());

    var trainDetails = childSnapshot.val();
  


    for (var key in trainDetails){
      console.log(trainDetails[key]);
      var trainInfo = trainDetails.train;
      var destinationInfo = trainDetails.destination;
      var frequencyInfo = trainDetails.frequency;
      var nextTrainInfo= trainDetails.nextTrain;
      var minutesAwayInfo = trainDetails.minutesAway;
    };
   


      var rowInfo = $("<tr>").append(
        $("<td>").text(trainInfo),
        $("<td>").text(destinationInfo),
        $("<td>").text(frequencyInfo),
        $("<td>").text(nextTrainInfo),
        $("<td>").text(minutesAwayInfo),
      );
      $("#train-table").append(rowInfo);
    
   
   

    // If any errors are experienced, log them to console.
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });