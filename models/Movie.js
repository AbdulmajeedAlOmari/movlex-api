const mongoose = require('mongoose')
const DateOnly = require('mongoose-dateonly')(mongoose)

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 124,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  released: { type: DateOnly, required: true },
  genre: {
    type: [String],
    validate: {
      validator: function(v) {
        return v && v.length > 0
      },
      message: 'A movie must have at least one genre.'
    }
  },
  language: String,
  director: String,
  writer: String,
  plot: String,
  actors: [ String ],
  runtime: Number,
})



const Movie = new mongoose.model('Movie', movieSchema)

module.exports = Movie