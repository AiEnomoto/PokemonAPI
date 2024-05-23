const APIURL = `https://pokeapi.co/api/v2/evolution-chain/{myParam}`

async function loadData(info_query) {
   //document.querySelector('.card').style.display = 'block' //カードを表示
  try {
      const response = await fetch(`${APIURL}${info_query}`)
      const data = await response.info_json()
      console.log(result)
      displayData(data, result)
      console.log(data);
    } catch (error) {
      console.log (error);
    }
}


function displayData(info_json){
  const PokeId = document.querySelector('.card-title')
  PokeId.innerText = info_json.id
}

/**
 * Adds an event listener to the window object that listens for the 'load' event.
 * When the page is fully loaded, this function retrieves the value of the 'id' parameter from the URL query string and logs it to the console.
 * @listens load
 */
window.addEventListener('load', function(){
  // Parse the URL query string
  let params = new URLSearchParams(window.location.search)
  // Get the value of the 'id' parameter from the query string
  let myParam = params.get('id')
  // Log the value of 'id' parameter to the console
  console.log(myParam)
})