//create a basic Url for get access data
const basicUrl = "https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-ft-sf/";
//create a main variable store main in html
const main = document.querySelector(`main`);
//create a state object include allPlayers array in it;
const state = {
    allPlayers: [],
}

//get access all data from API
const getAllPlayers = async() =>{
try{
    const response = await fetch(`${basicUrl}players`);
    const responsejson = await response.json();
    state.allPlayers = responsejson.data.players;
} catch(err){
    console.log(err);
    console.log(`There was an error with your promise`);
}
console.log(state.allPlayers)
    renderAllPlayers();
}

//get access to specific players data base on different id
const getPlayerDetails = async(id) => {
    const response = await fetch(`${basicUrl}players/${id}`)
    const responsejson = await response.json();
    const playerDetails = responsejson.data.player;
    renderDetails(playerDetails);
}


//create a renderDetails to build up transfer page HTML content, include breed, and img
const renderDetails = (detailsOfAPlayer) => {
    const html = `
    <div>
    <h2>${detailsOfAPlayer.name}</h2>
    
    <P>${detailsOfAPlayer.status}</P>

    <P>${detailsOfAPlayer.breed}</P></div>
    
    <button id="back-button">Go Back To List</button>
    `;
    main.innerHTML = html;
    //set up button, when we click button, will go back to first outlook
    const backButton = document.querySelector(`#back-button`);
    console.log(backButton)
    backButton.addEventListener('click', (event)=>{
        renderAllPlayers();
    })
}
//<img src="${detailsOfAPlayer.imageUrl}" alt="image of a player"/>


//get access all names from data, and render list for names
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.map((singlePlayer) =>{
    return `<section><li>${singlePlayer.name}</li>
    <img id="${singlePlayer.id}" src="${singlePlayer.imageUrl}" alt="image of a player"/>
    <button>Delete</button></section>`;
    }) //[`<li>Name of the recipe</li>]

    //create a ol,add list into ol, and append ol under main part
    const ol = document.createElement('ol');
    ol.innerHTML = playerNames.join('');
    main.replaceChildren(ol);

    //create a function, create a interaction when click the players' name, for future use
    const listPlayers = document.querySelectorAll('img');
    listPlayers.forEach((singlePlayerList) => {
        console.log(singlePlayerList);
        singlePlayerList.addEventListener('click',
        (event) => {
            getPlayerDetails(event.target.id)
        })
    })
}
//invoke the function
getAllPlayers();

//design the form, collect input of the form
const form = document.querySelector(`form`);
form.addEventListener(`submit`, async(event) => {
    event.preventDefault();

    const nameInput = document.querySelector(`#name`);
    const imageUrlInput = document.querySelector(`#img-Url`);
    const breedInput = document.querySelector(`#breed`);

    const response = await fetch(`${basicUrl}players`, {
        method: `POST`,
        headers: {
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            name: nameInput.value,
            imageUrl: imageUrlInput.value,
            breed: breedInput.value
        })
    });
    const newPlayer = await response.json();
    console.log(newPlayer);
})

//Delete item;
const section = document.querySelector(`section`);
section.addEventListener(`Delete`, async(event) => {
    event.preventDefault();
    const response = await fetch(`${basicUrl}players`, {
        method: `Delete`,
        body: JSON.stringify({
            name: nameInput.value,
            imageUrl: imageUrlInput.value,
            breed: breedInput.value
        })
    });
    const newPlayer = await response.json();
    console.log(newPlayer);
})