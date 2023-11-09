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
    const response = await fetch(`${basicUrl}players`);
    const responsejson = await response.json();
    state.allPlayers = responsejson.data.players;
    //console.log(state.allPlayers)
    renderAllPlayers();
}

//get access to specific players data base on different id
const getPlayerDetails = async(id) => {
    const response = await fetch(`${basicUrl}players/${id}`)
    const responsejson = await response.json();
    console.log(responsejson);
    const playerDetails = responsejson.data.player;
    renderDetails(playerDetails);
}

//create a renderDetails to build up transfer page HTML content, include breed, and img
const renderDetails = (detailsOfAPlayer) => {
    const html = `
    <section>
    <h2>${detailsOfAPlayer.name}</h2>
    
    <img src="${detailsOfAPlayer.imageUrl}" alt="image of a player"/>
    
    <P>${detailsOfAPlayer.breed}</P></section>
    
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



//get access all names from data, and render list for names
const renderAllPlayers = () => {
    const playerNames = state.allPlayers.map((singlePlayer) =>{
    return `<li id="${singlePlayer.id}">${singlePlayer.name}</li>`;
    }) //[`<li>Name of the recipe</li>]

    //create a ol,add list into ol, and append ol under main part
    const ol = document.createElement('ol');
    ol.innerHTML = playerNames.join('');
    main.replaceChildren(ol);

    //create a function, create a interaction when click the players' name, for future use
    const listPlayers = document.querySelectorAll('li');
    listPlayers.forEach((singlePlayerList) => {
        singlePlayerList.addEventListener('click',
        (event) => {
            getPlayerDetails(event.target.id)
        })
    })
}
getAllPlayers();
















//create a renderDetails to build up transfer page HTML content, include breed, and img
// const renderDetails = (detailsOfAPlayer) => {
//     const html = `
//     <h2>${detailsOfAPlayer.name}</h2>
    
//     <img src="${detailsOfAPlayer.imageUrl}" alt="image of a player"/>
    
//     <P>${detailsOfAPlayer.breed}</P>
    
//     <button id="back-button">Go Back To List</button>
//     `;
//     main.innerHTML = html;
//     //set up button, when we click button, will go back to first outlook
//     const backButton = document.querySelector(`#back-button`);
//     console.log(backButton)
//     backButton.addEventListener('click', (event)=>{
//         renderAllPlayers();
//     })
// }
