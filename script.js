// Code snippets from TOP
/*
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
*/

const hashMap = function () {
  const loadFactor = 0.8;
  const map = [];
  // function src: https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#collisions
  const hash = function (string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
  };

  // length() returns the number of stored keys
  const length = function () {
    let countOfKeyValuePairs = 0;
    const mapLength = map.length;
    for (let i = 0; i < mapLength; i++) {
      if (map[i] !== undefined) {
        countOfKeyValuePairs += map[i].length;
      }
    }
  };

  // set(key, value) if key exists already then overwrite.
  // update table size if >= loadFactor capacity

  // get(key) returns value else null

  // keys() returns array containing all keys

  // has(key) returns a boolean

  // remove(key) returns a boolean

  // clear() clears the hashTable

  // values() returns an array with all values in hashTable

  // entries() returns an array containing all key value pairs
};
