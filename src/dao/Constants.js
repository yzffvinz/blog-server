module.exports = {
  WHERE_OPS: {
    EQ: '=',
    NE: '!',
    LT: '<',
    GT: '>',
    LTE: '<=',
    GTE: '>=',
    RANGE: 'range',
    IN: 'in' // TODO
  },
  MONGO_COMPARE_OPS_MAP: {
    '!': '$ne',
    '<': '$lt',
    '>': '$gt',
    '<=': '$lte',
    '>=': '$gte'
  },
  WHERE_TYPES: {
    NUMBER: 'number'
  }
}
