module.exports = {
  WHERE_OPS: {
    LIKE: '%',
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
    '%': '$regex',
    '!': '$ne',
    '<': '$lt',
    '>': '$gt',
    '<=': '$lte',
    '>=': '$gte'
  },
  WHERE_TYPES: {
    NUMBER: 'number',
    BOOLEAN: 'boolean'
  }
}
