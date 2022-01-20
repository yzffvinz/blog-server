const map = {}

function addDict (type, dict) {
  map[type] = dict
}

function translate (type, code) {
  return map[type]?.[code]
}

module.exports = {
  addDict,
  translate
}
