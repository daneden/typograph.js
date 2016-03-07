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
    // Decode HTML entities
    var str = _simpleDecode(el.innerHTML);

    // If the element is empty, return without any changes
    if(!str) return;

    // Start by splitting the string into an array of words
    var arr = str.split(' ');

    arr = arr.map(function(word){
      var isUpper = 0;
      // Split the word into characters
      word = word.split('');

      // If we're dealing with a single-character word (like "I"), return with no changes
      if(word.length <= 1) return word;

      word.map(function(c){
        // Check if each letter is uppercase (or numeric/punctuation)
        // and increment the isUpper counter
        if(c === c.toUpperCase()) isUpper++;
      });

      // Make our word a string again
      word = word.join('');

      // If the whole word is uppercase
      if(isUpper === word.length) {
        // Wrap the word in a span
        word = `<span class='caps'>${word}</span>`;
      }

      return word;
    });

    var frag = arr.join(' ');
    el.innerHTML = frag;
  }

  function _simpleDecode(str) {
    // Prepare a textarea to decode HTML entities in
    var el = document.createElement('textarea');
    el.innerHTML = str;
    return el.value;
  }
}
