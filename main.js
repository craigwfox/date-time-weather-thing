const data = {
  dateobj: new Date(),
  time: document.querySelector('.time'),
  date: document.querySelector('.date'),
  marker: document.querySelector('#marker'),
  positioning: [
    ['0', '270'],
    ['1', '285'],
    ['2', '300'],
    ['3', '315'],
    ['4', '330'],
    ['5', '345'],
    ['6', '0'],
    ['7', '15'],
    ['8', '30'],
    ['9', '45'],
    ['10', '60'],
    ['11', '75'],
    ['12', '90'],
    ['13', '105'],
    ['14', '120'],
    ['15', '135'],
    ['16', '150'],
    ['17', '165'],
    ['18', '180'],
    ['19', '195'],
    ['20', '210'],
    ['21', '225'],
    ['22', '240'],
    ['23', '260']
  ]
};

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
const getCombinedTime = function getHoursMinutes(dateobj) {
  let hours = data.dateobj.getHours(),
    minutes = data.dateobj.getMinutes();

  return `${makeTwoDigit(hours)}:${makeTwoDigit(minutes)}`;
};
data.time.innerHTML = getCombinedTime(data.dateobj);

// ====---------------====
// Date
// ====---------------====
const getCombinedDate = function getDate(dateobj) {
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
