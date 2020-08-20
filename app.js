const express = require('express');
const router = require('./routes/index');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

 
// configurações do express

const app = express();

// configuração do uso de json nas requisições

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

// configurando mensagens flash

app.use(cookieParser(process.env.SECRET));

app.use(session({

    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:false
}));

// configuração da inicialização e da sessão

app.use(passport.initialize());
app.use(passport.session());

// puxando o model Users para fazer a configuração de autenticação
// passport faz a serialização e a deserialização

const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

// midlewares
app.use((req, res, next) => {

    res.locals.h = helpers;
    res.locals.flashes = req.flash();
    res.locals.user = req.user;
    next();

});

// configuração das rotas

app.use('/', router);

// configuração da página de erro

app.use(errorHandler.notFound);


//configurando a engine mustache

app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;