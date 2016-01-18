# Project Requirements

Here are the project requirements as laid out on the paper.

## General requirements

In this project, I was required to:

* Use only external CSS.
* Use the CSS box positioning concept.
* Use the proper components for all form inputs.
* Use **pure JavaScript** for all form validations. No regexes.
* Be as creative as possible for the design, but make sure to keep it consistent.

## Form validation requirements

These were the validation requirements as requested by this project.

### Full name

* Must be filled.
* Must be between 4 and 30 characters.
* Must not contain any numbers and symbols (except space).
* First and last character must not contain any space.

### Username

* Must be filled.
* Must be alphanumeric.
* Must be between 5 and 20 characters.

### Gender

* Must be chosen. *(Non-binaries: I'm all for gender equality, but unfortunately, this was the only way I was allowed to do the gender input. Sorry.)*

### Password

* Must be filled.
* Must contain number.
* Must be between 8 and 20 characters.

### Email

* Must be filled.
* No `<input type="email">` elements allowed.
* Email must match with the format below:
  * Email must contain at sign (@) and dot (.) character
  * Only one (@) character.
  * Maximum of dot (.) character after at sign (@) is two characters.
  * Minimum of dot (.) character after at sign (@) is one character.
  * At sign (@) and dot (.) character cannot be placed besides each other.
  * At sign (@) and dot (.) character cannot be the first and the last character.

### Birth date

* Must be filled.
* Must be validated based on their month or year (include leap years).
* No `<input type="date">` elements allowed.

### Address

* Must be filled.
* Must ends with "Street".
* Must be more or equals than fifteen (15) characters.

## Other documentation

* `box-sizing` reset is used to ensure width and height is set accurately.
* Class `.clearfix` is used as a way to clear contained floats which are cross-browser compatible. The same styles is also used on the `.row` class
* For sizing, `rem` units is used instead of `px` and `em`, providing a way to specify sizes that scales along with the root element's size, in this case the `<html>` element.
* Color palette is based on Google Material Design colors.
* JavaScript objects is extensively used in this project (see `formElements` and `errors`).

## References

* Styles used on `.clearfix` class: <http://nicolasgallagher.com/micro-clearfix-hack/>
* Pure CSS slider class: <http://codepen.io/antoniskamamis/pen/hjBrE>
* `rem` units: <https://css-tricks.com/theres-more-to-the-css-rem-unit-than-font-sizing/>
* `box-sizing` reset: <http://www.paulirish.com/2012/box-sizing-border-box-ftw/>
* Color palette: <http://www.google.com/design/spec/style/color.html#color-color-palette>
* JavaScript objects: <http://www.w3schools.com/js/js_objects.asp>
* Photos:
  * Drum photo: <http://aravinthmusic.com/images/drums1.jpg>
  * Cymbal photo: <http://www.rhythmtraders.com/images/products/9138.jpg>
  * Hofner photo: <http://liobians.org/beatles/HOFNER62.jpg>
  * Fender photo: <http://wallpapercave.com/wp/bKtFDJX.png>
  * Electric drum photo: <http://c1.zzounds.com/media/quality,85/77838-ee5c91408fc3437336daf1bc391349c9.jpg>
  * Saxophone photo: <http://olegproducts.com/wp-content/uploads/2014/09/Oleg-Saxophone-Family.jpg>
