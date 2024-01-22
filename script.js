// Code snippets from TOP
/*
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bound");
  }
*/

const hashMap = function () {
  const loadFactor = 0.8;
  // function src: https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#collisions
  const hash = function (string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
  };
};
