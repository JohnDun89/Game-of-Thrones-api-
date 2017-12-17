//---------------------------------------------------------- API pull down code.

const app = function () {


  const url = 'https://www.anapioficeandfire.com/api/houses?page=1&pageSize=250'
  const house = JSON.parse(localStorage.getItem('house'));
  // console.log(url);
  makeRequest(url, requestComplete);
  // console.log('function running');
};

const requestComplete = function () {
  if ( this.status !== 200) return;
  var jsonString = this.responseText;
  houses = JSON.parse(jsonString);
  wordCount(houses);
};

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
  // console.log('loaded');
};

const save = function(house){
  const jsonString = JSON.stringify(house);
  localStorage.setItem('house', jsonString);
};

//-----------------------------------------------------------API appending code.

var wordCount = function(houses) {
  console.log('word count ran');
  var ul = document.querySelector('#count');
  houses.forEach(function(house, index){
  const li = document.createElement('li');
  li.innerText = house.words;
  if (house.words === '') {
    return;
  }
  li.value = index;
  ul.appendChild(li);
  });
};
// const displayHouseTitle = function (house) {
//   const titleSelect = document.querySelector('#title');
//   const titleStringy = JSON.stringify(house.name);
//   titleSelect.innerText  = titleStringy;
// };
//
// const displayHouseRegion = function (house) {
//   const regionSelect = document.querySelector('#region');
//   const regionStringy = JSON.stringify(house.region);
//   regionSelect.innerText = 'Region - ' + regionStringy;
// };
//
// const displayVassalOf = function (house) {
//   // console.log('vassal');
//   console.log(house.overlord);
//   const vassalStringy = JSON.stringify(house.overlord);
//   const houseP = JSON.parse(localStorage.getItem('vassal'));
//   // console.log(vassalStringy);
//   makeSingleRequest(house.overlord, requestSingleComplete)
// };
//
// const displayHouseWords = function (house) {
//   const wordsSelect = document.querySelector('#words');
//   const wordsStringy = JSON.stringify(house.words);
//   if (wordsStringy ==='""') { return;
//   };
//   wordsSelect.innerText = wordsStringy;
// };
//
// var populateOneHouses = function(house) {
//   var select = document.getElementById('vassal');
//   vassalName = JSON.stringify(house.name);
//   select.innerText = 'Vassal of - ' + vassalName;
// };

//------------------------------------------------------Document Event Listener.

document.addEventListener('DOMContentLoaded', app);
