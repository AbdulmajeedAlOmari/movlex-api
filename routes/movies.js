const express = require('express')
const router = express.Router()
const debug = require('debug')('app:movies')

// =======================
// Require Database Models
const Movie = require('../models/Movie')

// ======
// Routes
router.get('/', async (req, res) => {
  const movies = await Movie.find({}).sort('title')
  res.send(movies)
})

// Give a random movie
router.get('/random', async (req, res) => {
  const totalDocuments = await Movie.count()
  const randomIndex = Math.random() * totalDocuments
  const randomMovie = await Movie.find({}).limit(1).skip(randomIndex)

  res.send(randomMovie)
})

router.post('/', async (req, res) => {
  let movie = req.body

  movie = new Movie(movie)
  movie = await movie.save()

  if(!movie) return res.status(400).send('Movie details are incorrect.')

  return res.send(movie)
})

module.exports = router