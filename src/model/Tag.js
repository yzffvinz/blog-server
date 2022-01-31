class Tag {
  constructor ({
    _id,
    name,
    displayName,
    description,
    cover,
    order,
    parent
  }) {
    this._id = _id
    this.name = name
    this.displayName = displayName
    this.description = description
    this.cover = cover
    this.order = order
    this.parent = parent
  }
}

module.exports = Tag
