require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sequelize = require('./db/connection'); // Instanciando Sequelize
const { AdminUser, User, Task } = require('./models/index');

const devRouter = require('./routes/dev');  // Roteador para dev
const usersRouter = require('./routes/users'); // Roteador para usuários
const adminRouter = require('./routes/admin'); // Roteador para administradores

var app = express();

// Sincronizando os modelos com o banco de dados
async function syncModels() {
  try {
    // Sincronizando todos os modelos, incluindo dependências de chave estrangeira
    await sequelize.sync({ force: false }); // Se você quiser apagar e recriar as tabelas, troque `force: false` por `force: true`
    console.log('Tabelas criadas ou verificadas com sucesso!');
  } catch (error) {
    console.error('Erro na sincronização das tabelas:', error);
  }
}

// Executando a sincronização assim que o servidor iniciar
syncModels();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Registrando Helpers
const ifEquals = require('./helpers/ifEquals');
hbs.registerHelper('ifEquals', ifEquals);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const secretSession = process.env.SESSION;
app.use(
  session({
    name: "session",
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: () => {
      },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 360000,
      httpOnly: true,
    }
  })
);

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.session = req.session
  }
  next();
})

app.use('/', devRouter);  // Rota para a raiz do projeto
app.use('/v1/users', usersRouter);  // Rota para usuários
app.use('/v2/', adminRouter);  // Rota para administradores

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
