const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./swagger");


const indexRouter = require('./routes/index');
const connectDB = require('./db/mongo');

const app = express();

// Utilisation des middlewares
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
// Utiliser Swagger UI pour afficher la documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//Définir EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter);

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
  res.status(err.status || 500).json({
    error: err.message
  });
});

connectDB().then(() => {
  const Port = process.env.PORT || 3000;
    
  app.listen(Port , () => {
      console.log("Listening on port " + Port);
      console.log("Swagger available on http://localhost:8000/api-docs");
      });
  });

module.exports = app;
