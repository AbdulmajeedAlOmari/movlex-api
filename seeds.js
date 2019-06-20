const Movie = require('./models/Movie')
const debug = require('debug')('app:seeds')

const data = {
  movies: [
    {
      title: "Movie A",
      rating: 8.2,
      genre: ["Action", "Comedy"],
      released: '1/1/2019'
    },
    {
      title: "Movie B",
      rating: 6.3,
      genre: ["Drama", "Horror"],
      released: '1/1/2019'
    },
    {
      title: "Movie C",
      rating: 9.3,
      genre: ["Biography", "Drama"],
      released: '1/1/2019'
    },
    {
      title: "Movie D",
      rating: 5.3,
      genre: ["Comedy", "Family"],
      released: '1/1/2019'
    },
  ]
}

run()

async function run(){
  debug('Start seeding database...')
  
  await removeAll()
  await addAll()

  debug('Finished seeding database!')
}

async function removeAll() {
  debug('Removing all database documents...')

  await Movie.deleteMany({})

  debug('Removed all documents!')
}

async function addAll() {
  debug('Adding new documents to database...')

  const workers = []

  for(let i=0; i<data.movies.length; i++) {
    const movie = new Movie(data.movies[i])
    workers.push(movie.save())
  }

  await Promise.all(workers)

  debug('Added new documents!')
}