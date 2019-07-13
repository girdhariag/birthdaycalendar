/*global require test __dirname expect:true*/
/*eslint no-undef: "error"*/

'use strict';

var fs = require('fs');
var path = require('path');

test('renders the birthday data on week basis', function() {
  // Set up our document body
  document.body.innerHTML
    = '<div id="day-1"></div><div id="day-2"></div><div id="day-3"></div><div id="day-4"></div><div id="day-5"></div><div id="day-6"></div><div id="day-0"></div>'
    + '<textarea id="birthdayData" rows="20" cols="100" placeholder="Enter the given birthday data"></textarea>'
    + '<input id="currentYear" type="number" placeholder="Enter the current year">';

  var sampleData = fs.readFileSync(path.join(__dirname, '../sample/sample-input.txt')).toString();

  document.getElementById('birthdayData').value = sampleData;
  document.getElementById('currentYear').value = '2019';

  eval(fs.readFileSync(path.join(__dirname, '../assets/js/index.js')) + '; updateCalendar();');

  expect(document.getElementById('day-1').textContent).toEqual('GWFW');
  expect(document.getElementById('day-2').textContent).toEqual('NLTR');
  expect(document.getElementById('day-3').textContent).toEqual('HJPDMJPLJPSSAW');
  expect(document.getElementById('day-4').textContent).toEqual('VWHGPW');
  expect(document.getElementById('day-5').textContent).toEqual('RWMMRH');
  expect(document.getElementById('day-6').textContent).toEqual('');
  expect(document.getElementById('day-0').textContent).toEqual('GWDDRLSB');
});
