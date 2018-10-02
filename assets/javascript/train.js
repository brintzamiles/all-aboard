// Initialize Firebase
var config = {
	apiKey: "AIzaSyDBjW_ccTxAJhKkheWTr1txmZZjGEWIeMg",
	authDomain: "gt201808.firebaseapp.com",
	databaseURL: "https://gt201808.firebaseio.com",
	projectId: "gt201808",
	storageBucket: "gt201808.appspot.com",
	messagingSenderId: "813600827436"
};

firebase.initializeApp(config);
var trainData = firebase.database().ref();

$("#currentTime").append(moment().format("hh:mm A"));

// On submit button click, add Trains
$("#addTrainBtn").on("click", function () {

	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
	var frequencyInput = $("#frequencyInput").val().trim();

	console.log(trainName);
	console.log(destination);
	console.log(trainTimeInput);
	console.log(frequencyInput);

	// Create object for holding train data
	var newTrain = {
		name: trainName,
		destination: destination,
		trainTime: trainTimeInput,
		frequency: frequencyInput,
	}

	// push train information to Firebase
	trainData.push(newTrain);

	// clear form 
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#trainInput").val("");
	$("#frequencyInput").val("");

	return false;
});

trainData.on("child_added", function (childSnapshot) {

	console.log(childSnapshot.val());

	// set firebase variables to snapshot values
	var firebaseName = childSnapshot.val().name;
	var firebaseDestination = childSnapshot.val().destination;
	var firebaseTrainTimeInput = childSnapshot.val().trainTime;
	var firebaseFrequency = childSnapshot.val().frequency;

	var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
	var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
	var minutes = firebaseFrequency - timeRemainder;

	var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

	console.log(minutes);
	console.log(nextTrainArrival);
	console.log(moment().format("hh:mm A"));
	console.log(nextTrainArrival);
	console.log(moment().format("X"));

	// Append train info 
	$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});