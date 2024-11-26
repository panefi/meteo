var createError = require('http-errors');
var express = require('express');
var swaggerUi = require('swagger-ui-express');
var swaggerJsdoc = require('swagger-jsdoc');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stationsRouter = require('./routes/stations');  
var sensorsRouter = require('./routes/sensors');

var app = express();
const dotenv = require('dotenv');

dotenv.config();


// Swagger configuration
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Meteorological App',
    version: '1.0.0',
    description: 'This is a Meteorological Application API that provides various endpoints for managing stations and sensor data.'
  },
  servers: [
    {
      url: process.env.BASE_URL
    }
  ],
  tags: [
    {
      name: 'Sensors',
      description: 'API endpoints for managing sensor data'
    },
    {
      name: 'Stations',
      description: 'API endpoints for managing stations'
    },
    {
      name: 'Users',
      description: 'API endpoints for managing users'
    }
  ]
}

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'], // Adjust the path to your route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Use swagger-ui-express for your app documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/stations', stationsRouter);
app.use('/api/sensor', sensorsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
