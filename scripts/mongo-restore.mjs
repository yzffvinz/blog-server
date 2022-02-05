async function backup () {
  // eslint-disable-next-line no-undef
  await $`mongorestore -h localhost:27017 -d blog-db --dir ~/app/data/backup/${process.argv[3]} --drop`
}

backup()
