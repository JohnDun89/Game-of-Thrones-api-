//---------------------------------------------------------- API pull down code.

const app = function () {

  const dropdown = document.querySelector('#menu');

  const url = 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=250'
  // const url = 'https://www.anapioficeandfire.com/api/houses'
  // const one = 'https://anapioficeandfire.com/api/characters/583'
  const house = JSON.parse(localStorage.getItem('house'));
  // console.log(url);
  makeRequest(url, house);
  // console.log('function running');

  dropdown.addEventListener('change', function(){
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
  request.addEventListener('load', requestComplete);
  request.send();
  // console.log('loaded');
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
  regionSelect.innerText = 'Region, ' + regionStringy;
};

const displayVassalOf = function (house) {
  console.log('vassal');
  console.log(house.overlord);

  const vassalOf = document.querySelector('#vassal');
  const vassalStringy = JSON.stringify(house.overlord.name);
  vassalOf.innerText = 'Vassal to ' + vassalStringy;
};

const displayHouseWords = function (house) {
  const wordsSelect = document.querySelector('#words');
  const wordsStringy = JSON.stringify(house.words);
  if (wordsStringy ==='""'||'" "') { return;

  }
  wordsSelect.innerText = wordsStringy;
};

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
