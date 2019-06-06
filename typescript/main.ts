window.onload = function(){
    let getRandJokeBtn = <HTMLButtonElement> document.querySelector("main > button");
    getRandJokeBtn.onclick = getRandomJoke;

    getRandJokeBtn.click();
}

class Result{
    type:string;
    value:Joke;
}

class Joke{
    id:number = 0;
    joke:string = '';
    categories:Array<string>;
}
/**
 * Changes the disabled property of the Get Joke button
 * toggles loading gifs
 * @param isDisabled 
 */
function alterGetJokeEnabledState(isDisabled:boolean){
    // disable button
    let jokeBtn = <HTMLButtonElement>document.querySelector("main > button");
    jokeBtn.disabled = isDisabled;
    document.querySelector("#loading-section").classList.toggle("loading");
}

/** 
* Gets a random joke from the ICNDB.com service
*/
function getRandomJoke(){
    alterGetJokeEnabledState(true);

    let request = new XMLHttpRequest();
    request.onreadystatechange = handleRequestChange;

    // prepare request
    let url = "https://api.icndb.com/jokes/random";
    request.open("GET", url);

    // send request
    request.send();
}

function handleRequestChange(){
    let currRequest = <XMLHttpRequest>this;
    let readyState = currRequest.readyState;
    let status = currRequest.status;
    console.log("ReadyState: " + readyState);
    console.log("Status: " + status);
    console.log("ReadyState: " + readyState);

    if (readyState == 4 && status == 200) {
        let response = <Result>JSON.parse(currRequest.responseText);

        let newJoke = response.value;
        displayJoke(newJoke);
        
        alterGetJokeEnabledState(false);
    }    
}

function displayJoke(currJoke:Joke):void{
    let idElement = <HTMLElement>document.querySelector("main > span");
    let jokeElement = <HTMLElement>document.querySelector("main > p:nth-of-type(1)");
    let categoryElement = <HTMLElement>document.querySelector("main > p:nth-of-type(2)");

    idElement.innerText = 'Id: ' + currJoke.id;
    jokeElement.innerText = currJoke.joke;
    categoryElement.innerText = 'Categories: ' + currJoke.categories;
}