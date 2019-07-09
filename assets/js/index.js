'use strict';

function compare(a, b) {
  // To sort the data according to the date of birth.
  if (a.unformattedBirthdate > b.unformattedBirthdate) {
    return -1;
  }

  if (a.unformattedBirthdate < b.unformattedBirthdate) {
    return 1;
  }

  return 0;
}

function updateCalendar() {
  var birthdayData = document.getElementById('birthdayData').value; // To fetch the input given in the JSON text area
  // Sample data -
  // [
  //   {
  //     name: "Girdhari Agarwal",
  //     birthday: "02/22/1994"
  //   },
  //   {
  //     name: "Raj Agarwal",
  //     birthday: "01/26/1992"
  //   },
  // ]
  //
  // JSON Parser required data -
  // [
  //   {
  //     "name": "Girdhari Agarwal",
  //     "birthday": "02/22/1994"
  //   },
  //   {
  //     "name": "Raj Agarwal",
  //     "birthday": "01/26/1992"
  //   },
  // ]

  birthdayData = birthdayData.replace(/name:/g, '"name":'); // to replace occurences of name to "name" in the JSON Data provided.

  birthdayData = birthdayData.replace(/birthday:/g, '"birthday":'); // to replace occurences of birthday to "birthday" in the JSON Data provided.

  try {
    birthdayData = JSON.parse(birthdayData);
  } catch (e) {
    window.alert('Please enter the birthday data in correct format.');
    return -1;
  }

  var currentYear = document.getElementById('currentYear').value || new Date().getFullYear(); // Get the year entered in the input box, if no input is given, take the current year as the desired value

  var weeklyData = []; // array to store the day wise birthday for the currentYear

  birthdayData.forEach(function (person) {
    var splittedNames = (person.name || '').split(' ');
    var initials = ''; // variable to store the initials for the current person's name

    splittedNames.forEach(function (name) {
      // Concat the first letter of all the words in the name
      initials += (name || '').charAt(0).toUpperCase();
    });
    person.initials = initials;
    person.unformattedBirthdate = new Date(person.birthday); // JSON date object for the person's DOB to comparatively sort them.

    if (person.unformattedBirthdate.getFullYear() <= currentYear) {
      // if the person is born on or before the currentYear of computation.
      var currentYearBirthday = new Date(person.birthday);
      currentYearBirthday.setFullYear(currentYear);
      person.currentYearBirthday = currentYearBirthday.getDay();

      if (weeklyData[person.currentYearBirthday]) {
        // if there exists an array for the current currentYearBirthday in the weeklyData, we push the person data to that array
        weeklyData[person.currentYearBirthday].push(person);
      } else {
        // else we create a new array for the currentYearBirthday in the weeklyData
        weeklyData[person.currentYearBirthday] = [ person ];
      } // weeklyData will have data stored in the form of Array of Arrays.

    }
  });

  for (var i = 0; i < 7; i++) {
    var currentWeekElement = document.getElementById('day-'.concat(i)); // get the DOM element for the week data

    currentWeekElement.innerHTML = ''; // initialize and reset the current DOM element to empty value.

    if (!weeklyData[i]) {
      currentWeekElement.className += ' empty-day';
    }
  }

  weeklyData.forEach(function (weekData, index) {
    // To modify the DOM by adding the weekly data prepared in the above steps into it.
    weekData.sort(compare); // Sorting the weekly data according to the person's date of birth

    var currentWeekElement = document.getElementById('day-'.concat(index)); // get the DOM element for the currentWeek data

    var count = weekData.length; // get the count of people having birthday on the current weekday

    var rowElementsCount = Math.ceil(Math.sqrt(count)); // get the count of the number of elements that need to be there in each of the rows.
    // For example: if count = 4, it can be shown in a 2x2 box, similarly for count = 9, 3x3 box will suffice.
    // so to fit the particular count, we need to have the next possible square value.
    // that can be achieved by getting the squareroot of the count and taking the next integer for it.

    var width = count > 0 ? 100 / rowElementsCount : 1; // getting the percentage width of the individual person cell.

    weekData.forEach(function (data) {
      var newDiv = document.createElement('div');
      var formattedWidth = ''.concat(width, '%'); // set the formatted width for giving height and width to the cell in percentage form.

      newDiv.style.width = formattedWidth;
      newDiv.style.height = formattedWidth;
      newDiv.setAttribute('class', 'person-cell');
      newDiv.innerHTML = data.initials;
      currentWeekElement.appendChild(newDiv);
    });
  });
}

// Things Pending
// 4. Check if we can optimize it more.
// 6. tool-tip/pop-over with the full name and date of birth.
// 8. Add Readme.md
