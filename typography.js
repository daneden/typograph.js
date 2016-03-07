/*
 * Typography.js
 * =============
 *
 * Add classes as style hooks for web typography.
 *
 * window.typography accepts either a string of simple CSS-style selectors or a NodeList. Examples:
 *
 *     typography('p, li');
 *     typography(document.querySelectorAll('p'));
 *
 * Copyright 2016 Daniel Eden
 *
 */

window.typography = function(els) {
  if(typeof els === 'string') {
    els = document.querySelectorAll(els);
  }

  for(var i = 0; i < els.length; i++) {
    var el = els[i];
    caps(el);
  }

  function caps(el) {
    var tel = document.createElement('textarea');
    var string = el.innerHTML;
    tel.innerHTML = string;
    string = tel.value;

    // If the element is empty, return without any changes
    if(!string) return;

    // Start by splitting the string into an array of words
    var arr = string.split(' ');

    arr = arr.map(function(word){
      var isUpper = 0;
      // Split the word into characters
      word = word.split('');

      if(word.length <= 1) return word;

      word.map(function(character){
        // If it's not, check if it's an uppercase letter
        if(character === character.toUpperCase()) {
          // If it is, increment isUpper
          isUpper++;
        }
      });

      // If the whole word is uppercase
      if(isUpper == word.length) {
        // Turn the word back into a string
        word = word.join('');
        // Wrap the word in a span
        word = `<span class='caps'>${word}</span>`;
      } else {
        // Otherwise, return the word intact
        word = word.join('');
      }

      return word;

    });

    var frag = arr.join(' ');
    el.innerHTML = frag;
  }
}
