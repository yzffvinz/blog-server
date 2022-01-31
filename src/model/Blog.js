class Blog {
  constructor ({
    _id,
    title, // 标题
    cover = '', // 封面图
    description = '', // 描述
    author = '', // 作者
    content = '', // 内容
    category = '', // 分类
    tags = '', // 标签
    createtime = new Date(), // 创建时间
    updatetime = new Date(), // 更新时间
    hide = 0 // 是否隐藏: 0 不隐藏， 1 隐藏
  }) {
    this._id = _id
    this.title = title
    this.cover = cover
    this.description = description
    this.author = author
    this.category = category
    this.tags = tags
    this.createtime = createtime
    this.updatetime = updatetime
    this.hide = hide
    this.content = content
  }
}

module.exports = Blog
