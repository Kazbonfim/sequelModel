var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');

const sequelize = require('./db/connection'); // Comente aqui
const User = require('./models/Users'); // Comente aqui

const devRouter = require('./routes/index');  // Roteador para dev
const usersRouter = require('./routes/users'); // Roteador para usuários
const dashboardRouter = require('./routes/dashboard'); // Roteador para dashboard
const updateRouter = require('./routes/update');  // Roteador para update

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

app.use('/', devRouter);  // Rota para a raiz do projeto
app.use('/v1/users', usersRouter);  // Rota para usuários
app.use('/v1/dashboard', dashboardRouter);  // Rota para o dashboard
app.use('/v1/update', updateRouter);  // Rota para atualizar

sequelize // Comente aqui
  .sync(/*{ alter: true }*/)
  // .sync({ force: true }) // 🛑 NÃO USAR, vai apagar todos os dados
  .then(async () => {
    console.log('Banco sincronizado com sucesso!');
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
