const mongoose = require('mongoose');


require('dotenv').config({path:'variables.env'});

mongoose.connect(process.env.DATABASE,
    
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true 
        
     });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {

    console.error("Não conectou: " + error.message);

});

const app = require('./app');

app.set('port', process.env.PORT || 7778);

const server = app.listen(app.get('port'), () => {

    console.log("Está rodando na porta: " + server.address().port);

});