const hashMap = function () {
  const loadFactor = 0.8;
  const map = [];

  // src: https://www.theodinproject.com/lessons/javascript-hashmap
  const verifyValidInsertion = function (index) {
    if (index < 0 || index >= map.length) {
      throw new Error("Trying to access index out of bound");
    }
  };

  // function src: https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#collisions
  const hash = function (string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }
    verifyValidInsertion(hashCode);
    return hashCode;
  };

  // length() returns the number of stored keys
  const length = function () {
    let countOfKeyValuePairs = 0;
    const mapLength = map.length;
    for (let i = 0; i < mapLength; i++) {
      if (map[i].isArray()) {
        countOfKeyValuePairs += map[i].length;
      }
    }
    return countOfKeyValuePairs;
  };

  const resize = function () {
    if (map.length > 0) {
      const newMapSize = map.length * 2;
      map.length = newMapSize;
    } else {
      map.length = 16;
    }
    return true;
  };

  const checkSize = function () {
    const amountOfData = length();
    const acceptableAmountOfData = loadFactor * map.length;
    if (amountOfData >= acceptableAmountOfData) {
      resize();
      return true;
    }
    return false;
  };

  /* set(key, value) if key exists already then overwrite.
  update table size if >= loadFactor capacity 
  Object structure: { key, value } */
  const set = function (key, value) {
    checkSize();
    const bucketToUse = hash(key);
    const item = { key: key, value: value };
    let bucket;
    let arrayPosition;
    if (map[bucketToUse].isArray()) {
      bucket = map[bucketToUse];
    } else {
      bucket = [];
    }
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        arrayPosition = i;
      } else {
        arrayPosition = false;
      }
    }
    if (arrayPosition) {
      bucket[arrayPosition] = item;
    } else {
      bucket.push(item);
    }
    return true;
  };

  // get(key) returns the key's value, else null
  const get = function (key) {
    const keyHash = hash(key);
    const bucket = map[keyHash];
    if (bucket.isArray()) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].key === key) {
          return bucket[i].value;
        }
      }
    }
    return null;
  };

  // keys() returns array containing all keys
  const keys = function () {
    const arrayOfKeys = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i].isArray()) {
        const thisBucket = map[i];
        for (let i = 0; i < thisBucket.length; i++) {
          const thisKey = thisBucket[i].key;
          arrayOfKeys.push(thisKey);
        }
      }
    }
    return arrayOfKeys;
  };

  // has(key) returns a boolean
  const has = function (key) {
    const keyHash = hash(key);
    const arrayOfKeys = map[keyHash];
    for (let i = 0; i < arrayOfKeys.length; i++) {
      if (arrayOfKeys[i].key === key) {
        return true;
      }
    }
    return false;
  };

  // remove(key) returns a boolean
  const remove = function (key) {
    const keyHash = hash(key);
    const arrayOfKeys = map[keyHash];
    for (let i = 0; i < arrayOfKeys.length; i++) {
      if (arrayOfKeys[i].key === key) {
        arrayOfKeys.splice(i, 1);
        return true;
      }
    }
    return false;
  };

  // clear() clears the hashTable
  const clear = function () {
    map = [];
    map.length = 16;
  };

  // values() returns an array with all values in hashTable

  // entries() returns an array containing all key value pairs
};
