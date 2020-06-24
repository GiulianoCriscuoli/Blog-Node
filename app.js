const express = require('express');
const router = require('./routes/index');
const mustache = require('mustache-express');
const helpers = require('./helpers');
const errorHandler = require('./handlers/errorHandler');
 
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use((req, res, next) => {

    res.locals.h = helpers;
    next();

});

app.use('/', router);

app.use(errorHandler.notFound);



app.engine('mst', mustache(__dirname + '/views/partials', '.mst'));
app.set('view engine', 'mst');
app.set('views', __dirname + '/views');

module.exports = app;