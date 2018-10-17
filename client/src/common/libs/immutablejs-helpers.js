/**
 * Finds the index of the first item in the collection matching the `value`
 *
 *  Eg. if you search for an index of and item at key `fieldId` with value `5`
 *  you'll want to use: findIndexByValue(collection, 'fieldId', 5);
 *
 * @param  {List|Map} collection The collection to search in
 * @param  {string|number} key The field name to search the value at
 * @param  {any} value The value to compare against
 * @return {number} The index that was found; if no index was found `-1` will be returned
 */
export function findIndexByValue(collection, key, value) {
  const result = collection.findIndex((item) => {
    if (item.get(key) === value) {
      return true;
    }

    return false;
  });

  return result;
}

/**
 * Finds the first item in the collection with one of its properties matching the `value`
 *
 *  Eg. if you search for an item that has `fieldId` set to `5`
 *  you'll want to use: findByValue(collection, 'fieldId', 5);
 *
 * @param  {List|Map} collection The collection to search in
 * @param  {string|number} key The field name to search the value at
 * @param  {any} value The value to compare against
 * @return {number} The index that was found; if no index was found `-1` will be returned
 */
export function findByValue(collection, key, value) {
  const result = collection.find((item) => {
    if (item.get(key) === value) {
      return true;
    }

    return false;
  });

  return result;
}
