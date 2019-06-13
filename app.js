const express = require('express')
const app = express()
const mainDebugger = require('debug')('app:main')
const port = process.env.port || 3000

// ===============
// Defining routes
// const moviesRoute = require('./routes/movies')

mainDebugger('Defined all routes.')

// =================================
// Setting up middlewares and config
app.use(express.json())

mainDebugger('Configured application.')

// =============================
// Development environment setup
if(app.get('env') !== 'production') {
  // Load morgan package to show requests on the console
  const morgan = require('morgan')

  // Use morgan package with 'tiny' setting, to show needed request headers.
  app.use(morgan('tiny'))

  mainDebugger('Finished development environment setup.')
}

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => mainDebugger(`Movlex API is listening on port ${port}!`))