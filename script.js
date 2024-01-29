const hashMap = function () {
  const loadFactor = 0.8;
  const map = [];

  // src: https://www.theodinproject.com/lessons/javascript-hashmap
  const verifyValidInsertion = function (index) {
    if (index < 0 || index >= map.length) {
      throw new Error(
        `Trying to access index ${index}, which is out of bounds`
      );
    }
  };

  // function src: https://www.theodinproject.com/lessons/javascript-hashmap-data-structure#collisions
  const hash = function (string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }
    return hashCode;
  };

  const pickABucket = function (string) {
    const hashCode = hash(string);
    const bucket = hashCode % map.length;
    verifyValidInsertion(bucket);
    return bucket;
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
    return countOfKeyValuePairs;
  };

  // entries() returns an array containing all key value pairs
  const entries = function () {
    const arrayOfItems = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i] !== undefined) {
        const thisBucket = map[i];
        for (let j = 0; j < thisBucket.length; j++) {
          const thisItem = thisBucket[i];
          arrayOfItems.push(thisItem);
        }
      }
    }
    return arrayOfItems;
  };

  const reassignOldItems = function (arrayOfOldItems) {
    while (arrayOfOldItems.length > 0) {
      const thisObject = arrayOfOldItems.shift();
      const bucket = map[pickABucket(thisObject.key)];
      if (bucket !== undefined) {
        bucket.push(thisObject);
      } else {
        bucket = [];
        bucket[0] = thisObject;
      }
    }
  };

  const resize = function () {
    if (map.length > 0) {
      const oldEntries = entries();
      const newMapSize = map.length * 2;
      map = [];
      map.length = newMapSize;
      reassignOldItems(oldEntries);
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
    }
  };

  /* set(key, value) if key exists already then overwrite.
  update table size if >= loadFactor capacity 
  Object structure: { key, value } */
  const set = function (key, value) {
    const item = { key: key, value: value };
    let arrayPosition;

    checkSize();

    if (map[pickABucket(key)] === undefined) {
      map[pickABucket(key)] = [];
    }

    const bucket = map[pickABucket(key)];

    console.log(bucket);

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        arrayPosition = i;
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
    const whichBucket = pickABucket(key);
    const bucket = map[whichBucket];
    if (bucket !== undefined) {
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
      if (map[i] !== undefined) {
        const thisBucket = map[i];
        for (let j = 0; j < thisBucket.length; j++) {
          const thisKey = thisBucket[j].key;
          arrayOfKeys.push(thisKey);
        }
      }
    }
    return arrayOfKeys;
  };

  // has(key) returns a boolean
  const has = function (key) {
    const whichBucket = pickABucket(key);
    const arrayOfKeys = map[whichBucket];
    for (let i = 0; i < arrayOfKeys.length; i++) {
      if (arrayOfKeys[i].key === key) {
        return true;
      }
    }
    return false;
  };

  // remove(key) returns a boolean
  const remove = function (key) {
    const whichBucket = pickABucket(key);
    const arrayOfKeys = map[whichBucket];
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
    resize();
  };

  // values() returns an array with all values in hashTable
  const values = function () {
    const arrayOfValues = [];
    for (let i = 0; i < map.length; i++) {
      if (map[i] !== undefined) {
        const thisBucket = map[i];
        for (let j = 0; i < thisBucket.length; j++) {
          const thisValue = thisBucket[j].value;
          arrayOfKeys.push(thisValue);
        }
      }
    }
    return arrayOfValues;
  };

  return { map, set, get, keys, has, remove, clear, values, entries };
};

const runTest = function () {
  const starWarsCharacters = hashMap();
  const logCharacterArray = function () {
    let string = "";
    for (let i = 0; i < starWarsCharacters.map.length; i++) {
      if (starWarsCharacters.map[i] !== undefined) {
        const thisBucket = starWarsCharacters.map[i];
        for (let j = 0; j < thisBucket.length; j++) {
          const thisItem = thisBucket[j];
          const itemString = `[ ${thisItem.key}, ${thisItem.value} ]`;
          if (j < thisBucket.length - 1) {
            itemString += ", ";
          }
          string += itemString;
        }
      }
    }
    console.log(string);
  };
  console.log("new hash map created");
  starWarsCharacters.set("Jyn Erso", "an A-180 blaster pistol");
  starWarsCharacters.set(
    "Cassian Andor",
    "a BlasTech A280-CFE convertible heavy blaster pistol"
  );
  starWarsCharacters.set("Darth Maul", "a double bladed red lightsaber");
  starWarsCharacters.set("Obi Wan Kenobi", "a green lightsaber");
  starWarsCharacters.set("Luke Skywalker", "a blue lightsaber");
  starWarsCharacters.set("Kylo Ren", "a red bladed crossguard lightsaber");
  starWarsCharacters.set("Darth Vader", "a red lightsaber");
  starWarsCharacters.set("Han Solo", "a modified DL-44 heavy blaster pistol");
  console.log(
    "various key value pairs of cool Star Wars characters and their weapons of choice have been set"
  );
  logCharacterArray();
  const hanSoloWeapon = starWarsCharacters.get("Han Solo");
  console.log(
    `according to our hash table, Han Solo's weapon of choice is: ${hanSoloWeapon}`
  );
  console.log(
    `here is an array of our favorite Star Wars characters: ${starWarsCharacters.keys()}`
  );
  if (starWarsCharacters.has("Jyn Erso")) {
    console.log("Yes, Jyn Erso is a great character");
  } else {
    console.log(
      "hey something is wrong here, Jyn Erso should be in that table"
    );
  }
  console.log(
    "actually, Kylo Ren was kind of a whiny baby; let's remove him from the cool characters array"
  );
  starWarsCharacters.remove("Kylo Ren");
  console.log(
    `ah, that's better; here's a better array of cool characters without that whiny baby in it: ${starWarsCharacters.keys()}`
  );
  console.log(
    `now for an array of all our favorite characters' weapons of choice: ${starWarsCharacters.values()}`
  );
  console.log(
    `here's our favorite characters and their favorite weapons: ${starWarsCharacters.entries()}`
  );
  console.log("well I guess we're done here; let's clear the array");
  starWarsCharacters.clear();
  console.log(`here's a blank array: ${starWarsCharacters.entries}`);
};

runTest();
