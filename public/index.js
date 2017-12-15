//---------------------------------------------------------- API pull down code.

const app = function () {

    const url = '"https://www.anapioficeandfire.com/api/houses"'
    const one = 'https://anapioficeandfire.com/api/characters/583'
    makeRequest(url, requestComplete);
    console.log('function running');

}

const requestComplete = function () {
  if ( this.status !== 200) {
    var jsonString = this.responseText;
    var GOTdata = JSON.parse(jsonString);
    populateHouses(GOTdata);
  }
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
  console.log('loaded');
}

//-----------------------------------------------------------API appending code.

var populateHouses = function(houses) {
  var houseList = document.getElementById('house-name');
  house.forEach(function())
}






//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
