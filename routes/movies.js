const express = require('express')
const router = express.Router()
const debug = require('debug')('app:movies')

// ==================================
// Temporary saved in memory for demo
const movies = [ 
  { id:1, title: 'Inception', rating: 8.8 },
  { id:2, title: 'The Avengers', rating: 8.1 },
  { id:3, title: 'The Dark Knight', rating: 9.0 }
]

// ======
// Routes
// router.get('/', (req, res) => {
//   res.send(movies)
// })

// Give a random movie
router.get('/random', (req, res) => {
  if(movies.length === 0) {
    return res.status(400).send('No movies were found.')
  }
  
  const randomIndex = Math.round(Math.random() * (movies.length - 1))
  debug('randomIndex: ' + randomIndex)
  res.send(movies[randomIndex])
})
module.exports = router