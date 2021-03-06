//---------------------------------------------------------- API pull down code.

const app = function () {

  const dropdown = document.querySelector('#menu');

  const url = 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=50'
  const url2 = 'https://www.anapioficeandfire.com/api/houses?page=2&pageSize=50'
  const url3 = 'https://www.anapioficeandfire.com/api/houses?page=3&pageSize=50'
  const url4 = 'https://www.anapioficeandfire.com/api/houses?page=4&pageSize=50'
  const url5 = 'https://www.anapioficeandfire.com/api/houses?page=5&pageSize=50'
  const url6 = 'https://www.anapioficeandfire.com/api/houses?page=6&pageSize=50'
  const url7 = 'https://www.anapioficeandfire.com/api/houses?page=7&pageSize=50'
  const house = JSON.parse(localStorage.getItem('house'));
  // console.log(url);
  makeRequest(url, requestComplete);
  makeRequest(url2, requestComplete);
  makeRequest(url3, requestComplete);
  makeRequest(url4, requestComplete);
  makeRequest(url5, requestComplete);
  makeRequest(url6, requestComplete);

  const button = document.querySelector('#button');
  console.log('button clicked');
  button.addEventListener('click',function(){
    window.location.href = "/words.html";
  })

  dropdown.addEventListener('change', function(){
    makeRequest(url, requestComplete);

    const house = houses[this.value];
    // console.log(this.value);
    // console.log('clicked');
    displayHouseTitle(house);
    displayHouseRegion(house);
    displayVassalOf(house);
    displayHouseWords(house);
    save(house);
  });
};

const requestComplete = function () {
  if ( this.status !== 200) return;
  var jsonString = this.responseText;
  houses = JSON.parse(jsonString);
  populateHouses(houses);
};

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
  // console.log('loaded');
};

const makeSingleRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
  console.log('loaded');
};

const requestSingleComplete = function () {
  if ( this.status !== 200) return;
  var jsonString = this.responseText;
  houses = JSON.parse(jsonString);
  populateOneHouses(houses);
};


const save = function(house){
  const jsonString = JSON.stringify(house);
  localStorage.setItem('house', jsonString);
};

//-----------------------------------------------------------API appending code.


const displayHouseTitle = function (house) {
  const titleSelect = document.querySelector('#title');
  const titleStringy = JSON.stringify(house.name);
  titleSelect.innerText  = titleStringy;
};

const displayHouseRegion = function (house) {
  const regionSelect = document.querySelector('#region');
  const regionStringy = JSON.stringify(house.region);
  regionSelect.innerText = 'Region - ' + regionStringy;
};

const displayVassalOf = function (house) {
  // console.log('vassal');
  console.log(house.overlord);
  const vassalStringy = JSON.stringify(house.overlord);
  const houseP = JSON.parse(localStorage.getItem('vassal'));
  // console.log(vassalStringy);
  makeSingleRequest(house.overlord, requestSingleComplete)
};

const displayHouseWords = function (house) {
  const wordsSelect = document.querySelector('#words');
  const wordsStringy = JSON.stringify(house.words);
  if (wordsStringy ==='""') { return;
  };
  wordsSelect.innerText = wordsStringy;
};

var populateOneHouses = function(house) {
  var select = document.getElementById('vassal');
  vassalName = JSON.stringify(house.name);
  select.innerText = 'Vassal of - ' + vassalName;
};

var populateHouses = function(houses) {
  var select = document.getElementById('menu');
  houses.forEach(function(house, index){
    const option = document.createElement('option');
    option.innerText = house.name;
    option.value = index;
    select.appendChild(option);
  });
};
//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
