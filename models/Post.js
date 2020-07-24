const mongoose = require('mongoose');
const slug = require('slug'); //função que gera um slug

mongoose.Promise = global.Promise;

// criando o modelo do banco de dados

const postSchema = new mongoose.Schema({

    title: {

        type: String,
        trim: true,
        required: 'Post precisa de um título'
    },
    slug:String,
    body: {

        type:String,
        trim:true
    },
    tags:[String]

});

// criando o slug

postSchema.pre('save', function(next) { // essa função com next é um middleware 

    if(this.isModified('title') === true) { // se esse objeto title foi modificado

        // o slug atual recebe a função slug() com 2 parâmetros
        // this.title, que éo title atual a ser modificado e
        // {lower:true} recebe o slug em minúsculo

        this.slug = slug(this.title, {lower: true});
       
        // ele fará a validação do slug gerado e irá para o próximo procedimento

        next(); 
        
    }
  
// postSchema  chama a função de pre
// função de pre(antes) recebe 2 parâmetros
// 'save' e uma função que fará as validações do slug gerado

});

module.exports = mongoose.model('Post', postSchema);