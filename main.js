const data = {
  dateobj: new Date(),
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  temperature: document.querySelector('.temperature'),
  conditions: document.querySelector('.conditions'),
  marker: document.querySelector('#marker'),
  zipform: document.querySelector('#getzip'),
  positioning: [
    ['0', '165'],
    ['1', '180'],
    ['2', '195'],
    ['3', '210'],
    ['4', '225'],
    ['5', '240'],
    ['6', '260'],
    ['7', '270'],
    ['8', '285'],
    ['9', '300'],
    ['10', '315'],
    ['11', '330'],
    ['12', '345'],
    ['13', '0'],
    ['14', '15'],
    ['15', '30'],
    ['16', '45'],
    ['17', '60'],
    ['18', '75'],
    ['19', '90'],
    ['20', '105'],
    ['21', '120'],
    ['22', '135'],
    ['23', '150']
  ],
  zip: '72034'
};

// ====---------------====
// Get location
// ====---------------====

const browserLocation = function getLocationUsingGeo() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(function(position) {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  });
};

const makexhr = function(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(JSON.parse(xhr.responseText));
    };
    xhr.onerror = reject;
    xhr.open('GET', url);
    xhr.send();
  });
};

const getCoords = function getUserCoordinates() {
  if (navigator.geolocation) {
    // use browser location data
    browserLocation().then(position => {
      makexhr(
        `https://api.weather.gov/points/${position[0]},${position[1]}`
      ).then(result => {
        console.log(result.properties);
        makexhr(result.properties.forecastHourly).then(result => {
          let curtemp = result.properties.periods[0].temperature,
            curcond = result.properties.periods[0].shortForecast;

          data.temperature.innerHTML = `${curtemp}<span>F</span>`;

          document
            .querySelector('body')
            .classList.add(`current-temp-${curtemp}`);

          data.conditions.innerHTML = curcond;
        });
      });
    });
  } else {
    console.log('has location off');
  }

  return;
};
getCoords();

// ====---------------====
// Make numbers two digits if less than 10
// ====---------------====
const makeTwoDigit = function addALeadingZeroToSingleDigit(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
};

// ====---------------====
// Time
// ====---------------====
const getCombinedTime = function getHoursMinutes() {
  let hours = data.dateobj.getHours(),
    minutes = data.dateobj.getMinutes();

  return `${makeTwoDigit(hours)}:${makeTwoDigit(minutes)}`;
};
data.time.innerHTML = getCombinedTime(data.dateobj);

// ====---------------====
// Date
// ====---------------====
const getCombinedDate = function getDate() {
  let month = data.dateobj.getMonth() + 1,
    day = data.dateobj.getDate(),
    year = data.dateobj.getFullYear();

  return `${makeTwoDigit(day)}/${makeTwoDigit(month)}/${makeTwoDigit(year)}`;
};
data.date.innerHTML = getCombinedDate(data.dateobj);

// ====---------------====
// Set marker position
// ====---------------====
const setMarkerPosition = function setsMarkerPosBasedOnTime(
  currenttime,
  element
) {
  let timeStringed = currenttime.toString();

  data.positioning.forEach(item => {
    if (item[0] === timeStringed) {
      element.setAttribute('transform', `rotate(${item[1]} 50 50)`);
    }
  });
};
setMarkerPosition(data.dateobj.getHours(), data.marker);
