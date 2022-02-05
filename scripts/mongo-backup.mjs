function getToday () {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${y}-${m}-${d}`
}

async function backup () {
  // eslint-disable-next-line no-undef
  await $`mongodump -h localhost:27017 -d blog-db -o ~/app/data/backup/${getToday()}`
}

backup()
