/**
 * Script providing functionality for a Pokémon search application.
 */
// API key and base URL for the Pokémon API
const APIKey = ""
const APIURL = `https://pokeapi.co/api/v2/pokemon/`

// References to HTML elements
const searchBox = document.getElementById('searchBox'); // Search box
const searchButton = document.getElementById('searchButton');// Search button
const moreinfo = document.querySelector('.moreinfo'); // More info link

// Hide the card element initially
document.querySelector('.card').style.display = 'none'; //カードを消す

/**
 * Function called when the search button is clicked.
 * Retrieves the value from the search box and calls the loadData function.
 */
function search() {
    const query = searchBox.value; // Get the value from the search box
    loadData(query); // Call the loadData function
}

// Add click event listener to the search button
searchButton.addEventListener('click', search);

/**
 * loadData= Loads data from theAPI and displays it on the page
 * @param {string} query -The search value to query the API with
 * @returns {Promise<void>} This function returns a promise that resolves with no value upon completion.
 * @throws {Error} Throws an error if the fetch request fails or if there is an issue processing the data.
 */

async function loadData(query) {
  //Display the card element
   document.querySelector('.card').style.display = 'block'; //カードを表示
  try {
    //Fetch data from the API using the provided query
      const response = await fetch(`${APIURL}${query}`);
      //Parse the JSON response
      const data = await response.json();
      //Load additional encounter data based on the initial fetch response
      const result = await loadEncounters(data.location_area_encounters);
      //Log the result
      console.log(result)
      //Display the fetched and processed data in the UI
      displayData(data, result)
      //Log the initial fetch response data
      console.log(data);
    } catch (error) {
      //Log any error that occur during the fetch or data processing
      console.log (error);
    }
}

/**
 * Fetches encounter data from a given URL, logs the process, and returns the parsed JSON data.
 * @param {string} url - The URL to fetch the encounter data from.
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON data if the fetch is successful, or the error object if the fetch fails.
 * @throws {Error} Throws an error if the fetch request fails or if there is an issue processing the data.
 */

async function loadEncounters(url){
  console.log(url); //Log the URL being fetched
  try {
    //Fetch data from the provided URL
    const response = await fetch(url);
    console.log(response); // Log the response object

    // Parse the response JSON
    const data = await response.json()
    console.log(data);

    //Return the parsed JSON data
    return data
  } catch (error) {
    // Log any errors that occur during the fetch or JSON parsing
    console.log (error);
    // Return the error object
    return error
  }
}

/**
 * Displays Pokémon data on the UI based on the provided JSON data and location information.
 * @param {Object} json - The JSON data containing Pokémon information.
 * @param {Array} location - An array of location data where the Pokémon can be encountered.
 * @returns {void} This function does not return any value.
 */

function displayData(json, location){
  // Display Pokémon name
  const PokeName = document.querySelector('.card-title')
  PokeName.innerText = json.name
  // Display Pokémon ID
  const PokeId = document.querySelector('.card-subtitle')
  PokeId.innerText = json.id
  // Display Pokémon type
  const Type = document.querySelector('.card-text1')
  Type.innerText = json.types[0].type.name
  // Display Pokémon location
  const Location = document.querySelector('.card-text2')
  Location.innerText = location[0].location_area.name
   // Display Pokémon image
  const image = document.querySelector('.card-img-top')
  if(json.sprites.front_default == "N/A"){
    image.src = '../img?placeholder.jpeg'
  }else{
  image.src = json.sprites.front_default 
  }

  // Set the href attribute for more information link
  moreinfo.href = './A2_moreinfo.html?' + 'id=' + json.id
  console.log('./A2_moreinfo.html?' + 'id=' + json.id)
}