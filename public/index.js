//---------------------------------------------------------- API pull down code.

const app = function () {

    const url = 'https://www.anapioficeandfire.com/api/houses'
    // const one = 'https://anapioficeandfire.com/api/characters/583'
    const house = JSON.parse(localStorage.getItem('house'));
    console.log(url);
    makeRequest(url, house);
    console.log('function running');

}

const requestComplete = function () {
  if ( this.status !== 200) return;
    var jsonString = this.responseText;
    var houses = JSON.parse(jsonString);
    populateHouses(houses);

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', requestComplete);
  request.send();
  console.log('loaded');
}

//-----------------------------------------------------------API appending code.

var populateHouses = function(houses) {
  var ul = document.getElementById('house-name');

  houses.forEach(function(house){
    var li = document.createElement('li');
    li.innerText = house.name;
    ul.appendChild(li);
  });
};






//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
