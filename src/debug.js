require('module-alias/register')

const { find, insertOne, updateById, removeById } = require('./dao/quick')

async function doSomething () {
  // insertOne('tag', {
  //   name: 'tech',
  //   parent: '2'
  // })
  // insertOne('tag', {
  //   name: 'tech',
  //   parent: '1'
  // })

  const tags = await find('tag', {}, {
    page: {
      pnum: 1,
      psize: 2
    }
  })
  const tag = JSON.parse(JSON.stringify(tags[0]))

  tag.name = '66888'

  await updateById('tag', tag)

  await removeById('tag', '61f5cd6c8357c5a126c357ea')
  const tagsM = await find('tag', {})
  console.log(tagsM)
  if (insertOne) {
    console.log(1)
  }
}

doSomething()
