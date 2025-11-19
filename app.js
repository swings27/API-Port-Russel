const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

// Configuration de Swagger avec swagger-jsdoc
const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Utilisation d'OpenAPI 3.0
    info: {
      title: 'API Port Russel', // Titre de l'API
      version: '1.0.0', // Version de l'API
      description: 'Ceci est une API REST simple documentée avec Swagger et Express',
    },
    servers: [
      {
        url: 'http://localhost:8000', // URL de l'API
      },
    ],
  },
  apis: ['./routes/*.js'], // Répertoire où Swagger va chercher les fichiers contenant des commentaires
};

// Générer la documentation Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Utiliser Swagger UI pour afficher la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Utilisation des middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

app.listen(8000, () => {
  console.log("Listening on port 8000")
});

module.exports = app;
