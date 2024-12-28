var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');

const sequelize = require('./db/connection'); // Comente aqui
const User = require('./models/Users'); // Comente aqui

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Helper de comparação
hbs.registerHelper('ifEquals', function (a, b, options) {
  console.log('Comparando:', a, b);

  // Convertendo ambos os valores para booleano antes da comparação
  if (Boolean(a) === Boolean(b)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

sequelize // Comente aqui
  .sync(/*{ alter: true }*/)
  .then(async () => {
    console.log('Banco sincronizado com sucesso!');
    // Verifica se o usuário já existe...
    // const userExists = await User.findOne({ where: { email: 'admin@gmail.com' } });
    // if (!userExists) {
    //   await User.create({
    //     name: 'admin',
    //     email: 'admin@gmail.com',
    //     occupation: 'developer',
    //     newsletter: 'false'
    //   });
    //   console.log('Usuário criado com sucesso!');
    // } else {
    //   console.log('Usuário já existe, continuando processos...');
    // }
  })
  .catch((error) => {
    console.log(error);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
