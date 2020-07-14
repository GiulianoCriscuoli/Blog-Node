const mongoose = require('mongoose');

//configurando as variáveis env

require('dotenv').config({path:'variables.env'});

//conexão com o banco de dados
mongoose.connect(process.env.DATABASE,
    
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
        
     });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {

    console.error("Não conectou: " + error.message);

});

// puxando o model do banco de dados

require('./models/Post');

// importando o app 

const app = require('./app');

// setando a porta de acesso do servidor

app.set('port', process.env.PORT || 7778);

// escutando a porta e dando a mensagem de onde a porta está rodando

const server = app.listen(app.get('port'), () => {

    console.log("Está rodando na porta: " + server.address().port);

});