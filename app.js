const express = require('express')
const app = express()
const mongoose = require('mongoose')
const startupDebugger = require('debug')('app:startup')

const port = process.env.port || 3000

// ===================
// Connect to Database
mongoose.connect('mongodb://localhost/movlex', { useNewUrlParser: true })

// ===============
// Defining routes
const moviesRoute = require('./routes/movies')

startupDebugger('Defined all routes.')

// =================================
// Setting up middlewares and config
app.use(express.json())

startupDebugger('Configured application.')

// =============================
// Development environment setup
if(app.get('env') !== 'production') {
  // Load morgan package to show requests on the console
  const morgan = require('morgan')

  // Use morgan package with 'tiny' setting, to show needed request headers.
  app.use(morgan('tiny'))

  startupDebugger('Finished development environment setup.')
}

// ======
// Routes
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/movies', moviesRoute)

app.listen(port, () => startupDebugger(`Movlex API is listening on port ${port}!`))