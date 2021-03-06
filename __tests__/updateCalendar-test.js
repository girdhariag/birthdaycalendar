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

test('removes the previous data when computated again', function() {
  // Set up our document body
  document.body.innerHTML
    = '<div id="day-1"></div><div id="day-2"></div><div id="day-3"></div><div id="day-4"></div><div id="day-5"></div><div id="day-6"></div><div id="day-0"></div>'
    + '<textarea id="birthdayData" rows="20" cols="100" placeholder="Enter the given birthday data"></textarea>'
    + '<input id="currentYear" type="number" placeholder="Enter the current year">';

  var sampleData = fs.readFileSync(path.join(__dirname, '../sample/sample-input.txt')).toString();

  document.getElementById('birthdayData').value = sampleData;
  document.getElementById('currentYear').value = '2019';

  eval(fs.readFileSync(path.join(__dirname, '../assets/js/index.js')) + '; updateCalendar(); updateCalendar();'); // computing the calendar data again

  expect(document.getElementById('day-1').textContent).toEqual('GWFW');
  expect(document.getElementById('day-2').textContent).toEqual('NLTR');
  expect(document.getElementById('day-3').textContent).toEqual('HJPDMJPLJPSSAW');
  expect(document.getElementById('day-4').textContent).toEqual('VWHGPW');
  expect(document.getElementById('day-5').textContent).toEqual('RWMMRH');
  expect(document.getElementById('day-6').textContent).toEqual('');
  expect(document.getElementById('day-0').textContent).toEqual('GWDDRLSB');
});

test('returns empty data when current year is less than the birthdate', function() {
  // Set up our document body
  document.body.innerHTML
    = '<div id="day-1"></div><div id="day-2"></div><div id="day-3"></div><div id="day-4"></div><div id="day-5"></div><div id="day-6"></div><div id="day-0"></div>'
    + '<textarea id="birthdayData" rows="20" cols="100" placeholder="Enter the given birthday data"></textarea>'
    + '<input id="currentYear" type="number" placeholder="Enter the current year">';

  var sampleData = fs.readFileSync(path.join(__dirname, '../sample/sample-input.txt')).toString();

  document.getElementById('birthdayData').value = sampleData;
  document.getElementById('currentYear').value = '1900';

  eval(fs.readFileSync(path.join(__dirname, '../assets/js/index.js')) + '; updateCalendar();');

  expect(document.getElementById('day-1').textContent).toEqual('');
  expect(document.getElementById('day-2').textContent).toEqual('');
  expect(document.getElementById('day-3').textContent).toEqual('');
  expect(document.getElementById('day-4').textContent).toEqual('');
  expect(document.getElementById('day-5').textContent).toEqual('');
  expect(document.getElementById('day-6').textContent).toEqual('');
  expect(document.getElementById('day-0').textContent).toEqual('');
});

test('replaces the empty data class with new values when we have some data filled', function() {
  // Set up our document body
  document.body.innerHTML
    = '<div id="day-1"></div><div id="day-2"></div><div id="day-3"></div><div id="day-4"></div><div id="day-5"></div><div id="day-6"></div><div id="day-0"></div>'
    + '<textarea id="birthdayData" rows="20" cols="100" placeholder="Enter the given birthday data"></textarea>'
    + '<input id="currentYear" type="number" placeholder="Enter the current year">';

  var sampleData = fs.readFileSync(path.join(__dirname, '../sample/sample-input.txt')).toString();

  document.getElementById('birthdayData').value = sampleData;
  document.getElementById('currentYear').value = '1900';

  eval(fs.readFileSync(path.join(__dirname, '../assets/js/index.js')) + '; updateCalendar();');

  expect(document.getElementById('day-1').className).toContain('empty-day');
  expect(document.getElementById('day-2').className).toContain('empty-day');
  expect(document.getElementById('day-3').className).toContain('empty-day');
  expect(document.getElementById('day-4').className).toContain('empty-day');
  expect(document.getElementById('day-5').className).toContain('empty-day');
  expect(document.getElementById('day-6').className).toContain('empty-day');
  expect(document.getElementById('day-0').className).toContain('empty-day');

  document.getElementById('currentYear').value = '2019';

  eval(fs.readFileSync(path.join(__dirname, '../assets/js/index.js')) + '; updateCalendar();');

  expect(document.getElementById('day-1').className).not.toContain('empty-day');
  expect(document.getElementById('day-2').className).not.toContain('empty-day');
  expect(document.getElementById('day-3').className).not.toContain('empty-day');
  expect(document.getElementById('day-4').className).not.toContain('empty-day');
  expect(document.getElementById('day-5').className).not.toContain('empty-day');
  // expect(document.getElementById('day-6').className).not.toContain('empty-day');
  expect(document.getElementById('day-0').className).not.toContain('empty-day');
});
