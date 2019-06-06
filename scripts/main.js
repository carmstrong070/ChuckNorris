window.onload = function () {
    var getRandJokeBtn = document.querySelector("main > button");
    getRandJokeBtn.onclick = getRandomJoke;
    getRandJokeBtn.click();
};
var Result = (function () {
    function Result() {
    }
    return Result;
}());
var Joke = (function () {
    function Joke() {
        this.id = 0;
        this.joke = '';
    }
    return Joke;
}());
function alterGetJokeEnabledState(isDisabled) {
    var jokeBtn = document.querySelector("main > button");
    jokeBtn.disabled = isDisabled;
    document.querySelector("#loading-section").classList.toggle("loading");
}
function getRandomJoke() {
    alterGetJokeEnabledState(true);
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleRequestChange;
    var url = "https://api.icndb.com/jokes/random";
    request.open("GET", url);
    request.send();
}
function handleRequestChange() {
    var currRequest = this;
    var readyState = currRequest.readyState;
    var status = currRequest.status;
    console.log("ReadyState: " + readyState);
    console.log("Status: " + status);
    console.log("ReadyState: " + readyState);
    if (readyState == 4 && status == 200) {
        var response = JSON.parse(currRequest.responseText);
        var newJoke = response.value;
        displayJoke(newJoke);
        alterGetJokeEnabledState(false);
    }
}
function displayJoke(currJoke) {
    var idElement = document.querySelector("main > span");
    var jokeElement = document.querySelector("main > p:nth-of-type(1)");
    var categoryElement = document.querySelector("main > p:nth-of-type(2)");
    idElement.innerText = 'Id: ' + currJoke.id;
    jokeElement.innerText = currJoke.joke;
    categoryElement.innerText = 'Categories: ' + currJoke.categories;
}
