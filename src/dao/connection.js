const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = 'mongodb://localhost:27017'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

module.exports.executeQuery = async function executeQuery (collectionName, queryFunc) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect()
    const collection = await client.db('blog-db').collection(collectionName)
    // const collection = await db.collection(collectionName)
    return await queryFunc(collection)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}

/**
 * 返回 ObjectId 的包装类
 * @param {*} id
 * @returns
 */
module.exports.__wrapObjectId = function __wrapObjectId (id) {
  if (!id) { throw new Error('_id is null') }
  if (!(id instanceof ObjectId)) {
    id = new ObjectId(id)
  }
  return id
}
