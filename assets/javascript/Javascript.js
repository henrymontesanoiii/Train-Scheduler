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

  //convert firstTrain date to unix
  // var firstTrainConverted = moment(firstTrainInput, "MM/DD/YYYY").format("X");

  if (!trainInput || !destinationInput || !firstTrainInput || !frequencyInput){
    return false;
  }

  // Console log each of the user inputs to confirm we are receiving them
  console.log(trainInput);
  console.log(destinationInput);
  console.log(firstTrainInput);//firstTrainConverted
  console.log(frequencyInput);

  database.ref("train").push({
    train: trainInput,
    destination: destinationInput,
    firstTrain: firstTrainInput,//firstTrainConverted
    frequency: frequencyInput
  })});

  database.ref("train").on("child_added", function (childSnapshot) {

    // Print the initial data to the console.
    console.log(childSnapshot.val());

    var trainDetails = childSnapshot.val();
  


    for (var key in trainDetails){
      console.log(trainDetails[key]);
      var trainInfo = trainDetails.train;
      var destinationInfo = trainDetails.destination;
      var firstTrainInfo = trainDetails.firstTrain;
      var frequencyInfo = trainDetails.frequency;
    };
    // var firstTrain = moment.unix(firstTrainInfo).format("MM/DD/YYYY");
    // console.log('firstTrain Date: ' + firstTrain)
    // var monthsWorked = moment().diff(moment(firstTrain, "X"), "months");
    // var totalBilled = monthsWorked * frequencyInfo;


      var rowInfo = $("<tr>").append(
        $("<td>").text(trainInfo),
        $("<td>").text(destinationInfo),
        $("<td>").text(frequencyInfo),
        $("<td>").text("Next Arrival"),
        $("<td>").text("Minutes Away"),
      );
      $("#train-table").append(rowInfo);
    
   
   

    // If any errors are experienced, log them to console.
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });