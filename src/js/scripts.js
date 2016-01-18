/* eslint-env browser */

(function () {
  // DOM element for `<form>`.
  var form = document.forms;

  if (form.length !== 0) {
    // Calls the form function if exists in the page.
    initForm(form[0]);
  }
})();

/**
 * Initializes the form.
 *
 * @param  {form} form  The form.
 * @return {void}
 */
function initForm(form) {
  // variable formElements is set as an Object.
  var formElements = {
    name: form.elements.namedItem('name'),
    username: form.elements.namedItem('username'),
    email: form.elements.namedItem('email'),
    gender: {
      value: checkRadioValue('gender')
    },
    password: document.getElementById('input-password'),
    birthDate: form.elements.namedItem('birth-date'),
    address: form.elements.namedItem('address'),
    phone: form.elements.namedItem('phone')
  };

  // variable errors is set as an Object.
  var errorBox = {
    main: document.getElementById('error-main'),
    name: document.getElementById('error-name'),
    username: document.getElementById('error-username'),
    email: document.getElementById('error-email'),
    gender: document.getElementById('error-gender'),
    password: document.getElementById('error-password'),
    birthDate: document.getElementById('error-birth-date'),
    address: document.getElementById('error-address'),
    phone: document.getElementById('error-phone')
  };

  // Buttons
  var btnSubmit = form.elements.namedItem('submit');
  var btnReset = form.elements.namedItem('reset');

  // Call handler functions when clicked
  btnSubmit.onclick = function () {
    // temporary variable to store number of errors
    // should reset every time button is clicked
    var errors = 0;

    // for debugging purposes
    console.log(errors);

    for (var i in formElements) {
      if (formElements.hasOwnProperty(i)) {
        // for debugging purposes
        console.log(i + ' -> ' + formElements[i].value);
        switch (i) {
          case 'name':
            if (verifyName(formElements[i].value, errorBox) === false) {
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.name.textContent = '';
            }
            break;
          case 'gender':
            if (checkRadioValue('gender') === null) {
              errorBox.gender.textContent = 'Please choose a gender.';
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.gender.textContent = '';
            }
            break;
          case 'username':
            if (verifyUsername(formElements[i].value, errorBox) === false) {
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.username.textContent = '';
            }
            break;
          case 'password':
            if (verifyPassword(formElements[i].value, errorBox) === false) {
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.password.textContent = '';
            }
            break;
          case 'email':
            if (verifyEmail(formElements[i].value, errorBox) === false) {
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.email.textContent = '';
            }
            break;
          case 'birthDate':
            if (verifyBirthDate(formElements[i].value, errorBox) === false) {
              errorBox.birthDate.textContent = 'Invalid birth date.';
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.birthDate.textContent = '';
            }
            break;
          case 'address':
            if (verifyAddress(formElements[i].value, errorBox) === false) {
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.birthDate.textContent = '';
            }
            break;
          case 'phone':
            if (verifyPhoneNumber(formElements[i].value, errorBox) === false) {
              errors += 1;
            } else {
              // Reset error text if verified
              errorBox.phone.textContent = '';
            }
            break;
          default:
            break;
        }

        console.log(errors);
      }
    }

    if (errors === 0) {
      errorBox.main.textContent = '';
      alert('Successfully submitted!');
    } else {
      errorBox.main.textContent = 'Whoops! There were some problems with your input.';
    }
  };

  // Call handler function for Reset when clicked
  btnReset.onclick = function () {
    var i;

    // reset all errorBoxes
    for (i in errorBox) {
      if (errorBox.hasOwnProperty(i)) {
        errorBox[i].textContent = '';
      }
    }
    for (i in formElements) {
      if (formElements.hasOwnProperty(i)) {
        if (i === 'gender') {
          // Reset radio buttons
          resetRadioValue('gender');
        } else {
          // Reset all other inputs
          formElements[i].value = '';
        }
      }
    }
  };
}

/**
 * Determines which radio button element is checked.
 *
 * @param  {string} formName The `name` attribute of the radio button set.
 * @return {string}          The `value` attribute of which radio is clicked.
 */
function checkRadioValue(formName) {
  var radios = document.getElementsByName(formName);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }

  // nothing checked
  return null;
}

/**
 * Resets all radio button elements to its unchecked state.
 *
 * @param {string} formName The `name` attribute of the radio button set.
 */
function resetRadioValue(formName) {
  var radios = document.getElementsByName(formName);
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
}

// so the errorBox parameter for these functions kinda came up midway into
// writing this because I never actually noticed it at first that the errorBox
// object isn't actually a global object .-.

/**
 * Verifies the Name input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyName(value, errorBox) {
  if (value === null || value === '') {
    errorBox.name.textContent = 'Please enter your name.';
    return false;
  }

  // validate characters
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(0) === ' ' || value.charAt(value.length - 1) === ' ') {
      errorBox.username.textContent = 'Username must not begin/end with space.';
      return false;
    }
    if ((value.charCodeAt(i) === 32) && (value.charCodeAt(i) > 32 ||
        value.charAt(i) < 65) && (value.charCodeAt(i) > 122)) {
      errorBox.name.textContent = 'Name must only contain letters.';
      return false;
    }
  }

  if (value.indexOf(' ') === -1) {
    errorBox.name.textContent = 'Please enter your full name.';
    return false;
  }

  return true;
}

/**
 * Verifies the Username input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyUsername(value, errorBox) {
  if (value === null || value === '') {
    // textbox is empty
    errorBox.username.textContent = 'Please enter a username.';
    return false;
  }

  if (value.length < 5 || value.length > 20) {
    errorBox.username.textContent = 'Username must be between 8 and 20 characters.';
    return false;
  }

  for (var i = 0; i < value.length; i++) {
    if (value.charAt(0) === ' ' || value.charAt(value.length - 1) === ' ') {
      errorBox.username.textContent = 'Username must not begin/end with space.';
      return false;
    }

    // ...jesus
    if ((value.charCodeAt(i) < 97 || value.charCodeAt(i) > 122) &&
        (value.charCodeAt(i) < 65 || value.charCodeAt(i) > 90) &&
        (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57) &&
        (value.charCodeAt(i) !== 32)) {
      errorBox.username.textContent = 'Username must be alphanumeric.';
      return false;
    }
  }

  return true;
}

/**
 * Verifies the Password input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyPassword(value, errorBox) {
  // iterator for forloops
  var i;

  var charCount = {
    letters: 0,
    numbers: 0,
    symbols: 0
  };

  for (i = 0; i < value.length; i++) {
    if ((value.charCodeAt(i) >= 65 && value.charCodeAt(i) <= 90) ||
        (value.charCodeAt(i) >= 97 && value.charCodeAt(i) <= 122)) {
      // count number of letters
      charCount.letters++;
    }
    if (value.charCodeAt(i) >= 48 && value.charCodeAt(i) <= 57) {
      // count number of numbers
      charCount.numbers++;
    }
    if ((value.charCodeAt(i) >= 33 && value.charCodeAt(i) <= 47) ||
        (value.charCodeAt(i) >= 58 && value.charCodeAt(i) <= 64) ||
        (value.charCodeAt(i) >= 91 && value.charCodeAt(i) <= 96) ||
        (value.charCodeAt(i) >= 123 && value.charCodeAt(i) <= 126)) {
      // count number of symbols
      charCount.symbols++;
    }
  }

  if (value === null || value === '') {
    errorBox.password.textContent = 'Please enter your password.';
    return false;
  }

  if (value.length < 8 || value.length > 20) {
    errorBox.password.textContent = 'Password must be between 8 and 20 characters.';
    return false;
  }

  for (i = 0; i < value.length; i++) {
    // validate characters
    if (value.charCodeAt(i) < 32 || value.charCodeAt(i) > 126) {
      errorBox.password.textContent = 'Password must contain letters, numbers, or symbols.';
      return false;
    }
  }

  if (charCount.numbers === 0) {
    errorBox.password.textContent = 'Password must contain a number.';
    return false;
  }

  return true;
}

/**
 * Verifies the Email input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyEmail(value, errorBox) {
  var i;

  // again, same thing here, object
  var charCount = {
    ats: 0,
    dots: 0
  };

  if (value === null || value === '') {
    errorBox.email.textContent = 'Email must be filled.';
    return false;
  }

  for (i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) === 64) {
      charCount.ats += 1;
    }
    if (value.charCodeAt(i) === 46) {
      charCount.dots += 1;
    }
  }

  if (charCount.ats !== 1 || charCount.dots > 2) {
    errorBox.email.textContent = 'Invalid email.';
    return false;
  }

  if (value.indexOf('@') > value.indexOf('.')) {
    errorBox.email.textContent = 'Invalid email.';
    return false;
  }

  if ((value.indexOf('.') - value.indexOf('@') === 1) ||
      (value.indexOf('@') - value.indexOf('.') === 1)) {
    errorBox.email.textContent = 'Invalid email.';
    return false;
  }

  if (value.charCodeAt(0) === 46 || value.charCodeAt(value.length - 1) === 46) {
    errorBox.email.textContent = 'Invalid email.';
    return false;
  }

  if (value.charCodeAt(0) === 64 || value.charCodeAt(value.length - 1) === 64) {
    errorBox.email.textContent = 'Invalid email.';
    return false;
  }

  return true;
}

/**
 * Verifies the Birth Date input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyBirthDate(value, errorBox) {
  if (value === null || value === '') {
    errorBox.birthDate.textContent = 'Birth date must be filled.';
    return false;
  }

  var dateTime = {
    year: function () {
      if (value.length === 10 && value.indexOf('-') === 2) {
        return value.substr(6, 4);
      }
      return 0;
    },
    month: function () {
      if (value.length === 10 && value.indexOf('-') === 2) {
        return value.substr(3, 2);
      }
      return 0;
    },
    day: function () {
      if (value.length === 10 && value.indexOf('-') === 2) {
        return value.substr(0, 2);
      }
      return 0;
    }
  };

  if (parseInt(dateTime.year()) === 0 || parseInt(dateTime.month()) === 0 || parseInt(dateTime.day()) === 0) {
    // parseInt is there because I'm an idiot
    return false;
  }

  // leap year check
  if (parseInt(dateTime.year()) % 4 == 0) {
    switch (parseInt(dateTime.month())) {
      case 1:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 2:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 29) {
          return false;
        }
        break;
      case 3:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 4:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 5:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 6:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 7:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 8:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 9:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 10:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 11:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 12:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      default:
        return false;
    }
  } else {
    switch (parseInt(dateTime.month())) {
      case 1:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 2:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 28) {
          return false;
        }
        break;
      case 3:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 4:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 5:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 6:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 7:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 8:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 9:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 10:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      case 11:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 30) {
          return false;
        }
        break;
      case 12:
        if (parseInt(dateTime.day()) < 1 || parseInt(dateTime.day()) > 31) {
          return false;
        }
        break;
      default:
        return false;
    }
  }

  // ...I'm laughing.

  return true;
}

/**
 * Verifies the Address input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyAddress(value, errorBox) {
  if (value === null || value === '') {
    errorBox.address.textContent = 'Please enter an address.';
    return false;
  }

  if (value.length < 15) {
    errorBox.address.textContent = 'Address must be longer than 15 characters.';
    return false;
  }

  if (value.endsWith('Street') === false) {
    errorBox.address.textContent = 'Invalid address.';
    return false
  }

  return true;
}

/**
 * Verifies the Phone Number input.
 *
 * @param  {string} value       The input value to be checked.
 * @param  {errorBox} errorBox  The error message container for this input.
 * @return {boolean}            true if all requirements are met
 */
function verifyPhoneNumber(value, errorBox) {
  if (value === null || value === '') {
    errorBox.phone.textContent = 'Please enter a phone number.';
    return false;
  }

  for (var i = 0; i < value.length; i++) {
    if ((value.charCodeAt(i) < 42 || value.charCodeAt(i) > 44) &&
        (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57)) {
      errorBox.phone.textContent = 'Phone number must be numeric.';
      return false;
    }
  }

  return true;
}
