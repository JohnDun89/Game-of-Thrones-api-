//---------------------------------------------------------- API pull down code.

const app = function () {

  const dropdown = document.querySelector('#dropdown');
  const url = 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=250'
  // const url = 'https://www.anapioficeandfire.com/api/houses'
  // const one = 'https://anapioficeandfire.com/api/characters/583'
  const house = JSON.parse(localStorage.getItem('house'));
  console.log(url);
  makeRequest(url, house);
  console.log('function running');

  // const dropDown = document.getElementById('menu');
  // dropDown.addEventListener('click', function () {
  //   console.log('clicked');


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
  var select = document.getElementById('menu');

  houses.forEach(function(house, index){
    const option = document.createElement('option');
    option.innerText = house.name;
    option.value = index;
    select.appendChild(option);
    // var li = document.createElement('li');
    // var liSeat = document.createElement('li');
    // li.innerText = house.name + ', ' + house.region;
    // liSeat.innerText = house.region;
    // ul.appendChild(li);
    // ul.appendChild(liSeat);
  });
};





//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
