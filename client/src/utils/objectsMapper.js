export const _mapKeys = (array, keyProperty) => {
  return array.reduce((newObjects, currentItem) => {
    newObjects[currentItem[keyProperty]] = currentItem;
    return newObjects;
  }, {});
};

export const _omit = (objects, keyProperty) => {
  const updatedObjects = Object.assign({}, objects);
  delete updatedObjects[keyProperty];

  return updatedObjects;
};
