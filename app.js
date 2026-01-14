const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./swagger");


const indexRouter = require('./routes/index');
const connectDB = require('./db/mongo');

const app = express();

/**
 * @swagger
 * components:
 *   responses:
 *     NotFound:
 *       description: La ressource demandée est introuvable
 *     InternalError:
 *       description: Erreur serveur interne
 */

/**
 * @swagger
 * tags:
 *   - name: Root
 *     description: Routes principales de l'application
 */

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
// Utiliser Swagger UI pour afficher la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Définir EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Page d'accueil
 *     tags: [Root]
 *     description: Retourne la page principale de l'application
 *     responses:
 *       200:
 *         description: Page rendue avec succès
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
app.use('/', indexRouter);

// Catch 404 et envoie vers l'error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // Render JSON pour API
  res.status(err.status || 500).json({
    error: err.message
  });
});


//Connection à la base de données et lancement du serveur
connectDB()
  .then(() => {
    const Port = process.env.PORT || 3000;
    app.listen(Port , () => {
      console.log("Listening on port " + Port);
      console.log(`Swagger available on http://localhost:${Port}/api-docs`);
      });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
  });

module.exports = app;
