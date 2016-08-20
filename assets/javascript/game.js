var games = 0;
var countries = ["canada","mexico","colombia","peru","costarica","panama","guatemala","honduras","brazil",
"paraguay","argentina","cuba","venezuela","nicaragua","ecuador","uruguay","suriname","chile"];

var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

var guessChars = [];
var alreadyGuessed = document.getElementById("already");
var turns = document.getElementById("turnsLeft");
var over = document.getElementById("gameOver");
var letterSpace = document.getElementById("charList");
var letterArray = document.getElementById("yourLetters");
var closeText = document.getElementById("closeText");
var winsNumber = document.getElementById("winsNumber");
var imageWindow = document.getElementById("imagePane");
var factsWindow = document.getElementById("countryFacts");
var anthemWindow = document.getElementById("anthem");
var underScores = "";
var wins = 0;
var turnNo = 15;
var push = true;
var currentCountry;
var characterCount;
function randCountry() {
currentCountry = countries[Math.floor(Math.random()*countries.length)];
}

randCountry();

function countChars(nation) {
var characterCount = nation.length;
return characterCount;
}

countChars(currentCountry);

function fillSpace() {
var spaceBar = document.createElement("div")
var att = document.createAttribute("id");
att.value = "theSpaces"+games;
spaceBar.setAttributeNode(att);

underScores = "";
for (i=0; i<countChars(currentCountry); i++) {
	underScores = underScores + "_";
}
spaceBar.innerHTML = underScores;
letterSpace.appendChild(spaceBar);
}

fillSpace();
var underScoresChars = document.querySelector("#theSpaces"+games);

function addWins() {
wins++;
winsNumber.innerHTML = wins;
}

function resetGame () {
var newGame = games-1;
var underScoresChars = document.querySelector("#theSpaces"+newGame);
letterSpace.removeChild(underScoresChars);
underScoresChars.innerHTML = "";
randCountry();
countChars(currentCountry);
guessChars = [];
over.innerHTML = "";
imageWindow.innerHTML = "";
factsWindow.innerHTML = "";
anthemWindow.innerHTML = "";
turnNo = 15;
push = true;
closeText.innerHTML = "<h3>Choose a letter!</h3><h3>Your letters:</h3><div id='yourLetters'></div><h3>You have <span id=\"turnsLeft\">15</span> turns left.</h3>"
}

document.onkeyup = function(event) {
if (turnNo>0) {
var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
}
var isALetter = letters.indexOf(userGuess);

if (isALetter == -1) {
	alreadyGuessed.innerHTML = "This is not a letter.";
}

		var index = guessChars.indexOf(userGuess);

		if (index != -1 && turnNo>0 && push == true) {
			alreadyGuessed.innerHTML = "You've already guessed this letter!";
		} else {
			guessChars.push(userGuess);
			alreadyGuessed.innerHTML = "";
			var letterArray = document.getElementById("yourLetters");
			letterArray.innerHTML = guessChars;
		}

var countryLetters = currentCountry.split("");

var ifInString = countryLetters.indexOf(userGuess);
var divChild = "";

if (ifInString != -1) {
replaceChar();
}

function replaceChar() {
for (var j=0; j<countChars(currentCountry); j++) {
if (userGuess === countryLetters[j]) {
var divForLoop = document.querySelector("#theSpaces"+games);
var divChild = String(divForLoop.firstChild.nodeValue);
var underScoresArray = divChild.split("");
var capLet = userGuess.toUpperCase();
underScoresArray.splice(j,1,capLet);
var newCharList = underScoresArray.join("");
divForLoop.innerHTML = newCharList;
}
}
}

var winCheck = document.querySelector("#theSpaces"+games);
var winValue = String(winCheck.firstChild.nodeValue);
var winArray = winValue.split("");
var spaceCheck = winArray.indexOf("_");

//Win scenario
if (spaceCheck < 0) {
closeText.innerHTML = "";
push = false;
over.innerHTML = "<h3>You win!<br>Please <span onClick=\"resetGame(); fillSpace();\">CLICK HERE</span> to restart.</h3>";
addWins();
aoooo();
games++;
var imageWindow = document.getElementById("imagePane");
var factsWindow = document.getElementById("countryFacts");
var anthemWindow = document.getElementById("anthem");
var countryIndex = countryStats.findIndex(x=>x.name==currentCountry);
var countryObject = countryStats[countryIndex];
var countryCaps = countryObject.name.toUpperCase();
var picToInsert = "<img src=\"assets/images/" + countryObject.image + "\" class=\"img-responsive\" alt=\"Indigenous art of " + countryObject.name + "\" /\"><br/>";
var textToInsert = "<h3>Country name: " + countryCaps + "</h3><h3>Capital: " + countryObject.capitalCity + "</h3><h3>National bird: " + countryObject.bird + "</h3><h3>Currency: <span class=\"blue\">" + countryObject.currency + "</span></h3>";
var vidToInsert = "<h4>Rise for the National Anthem!</h4><br/><iframe width=\"420\" height=\"315\" src=\"https://www.youtube.com/embed/" + countryObject.youTube +"?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>\"<br/>";
imageWindow.innerHTML = picToInsert;
factsWindow.innerHTML = textToInsert;
anthemWindow.innerHTML = vidToInsert;
}

//Still turns left
if (turnNo >= 1 && spaceCheck >= 0) {
turnNo--;
var turns = document.getElementById("turnsLeft");
turns.innerHTML = turnNo;

//nested the loss condition for when the turn counter hits 0
if (turnNo==0) {
push = false;
closeText.innerHTML = "";
//replaced the &quot; with escaped \"
over.innerHTML = "<h3>Game over!<br/>Thanks for playing!<br>Please <span onClick=\"resetGame(); fillSpace();\">CLICK HERE</span> to restart.</h3>";
heyy();
games++;
}

}

}

function aoooo() {
		var winSound = document.createElement("audio");
		winSound.src = "assets/aoooo!.WAV";
		winSound.id = "victory";
		winSound.type = "wav";
		var winSoundId = winSound.id;
		document.body.appendChild(winSound);
		
	function play(){
       var audio = document.getElementById(winSoundId);
       audio.play();
                 }
	play();
}

function heyy() {
		var lossSound = document.createElement("audio");
		lossSound.src = "assets/heyy.WAV";
		lossSound.id = "loss";
		lossSound.type = "wav";
		var lossSoundId = lossSound.id;
		document.body.appendChild(lossSound);
		
	function play(){
       var audio = document.getElementById(lossSoundId);
       audio.play();
                 }
	play();
}