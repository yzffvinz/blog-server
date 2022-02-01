# blog-server
博客后端

## 模块命名规范

对其他模块提供服务的，使用大坨峰命名，其他采用小驼峰命名

### dao

dao 层用于 mongodb 的数据操作，命名以 Dao 结尾，例子：TagDao

### service

service 层用于数据的整理合并，命名以 Service 结尾，例子：ServiceDao

### api

api 层用于提供给前端数据的接口，逻辑尽量简单，以 Api 结尾，例子：TagApi



## 编写中可以优化的点

### coding相关

1. 创建文件自动添加头部
2. 函数自动添加注释

### 技术相关

1. 裁剪字段：graphql 或者 查询字段细化
2. koa 洋葱模型自动处理错误返回 default 的错误返回
3. 低代码：是否可以自动生成增删改查相关的一切
