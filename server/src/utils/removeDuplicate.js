/**
 * 
 * @param {} array remove duplicates from array of objects
 * @param {*} property the property to ensure uniqueness of.
 * if null, filter by values
 */
module.exports = function (array, property = null) {
  if (property) {
    return array.filter((row, index, self) => self.findIndex(
      obj => obj[property] === row[property]
    ) === index
    )
  } else {
    return Array.from(new Set(array));
  }
}