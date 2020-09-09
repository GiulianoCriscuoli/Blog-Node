const mongoose = require('mongoose');
const slug = require('slug'); //função que gera um slug

const objectId = mongoose.Schema.Types.ObjectId; // o objectId do author

mongoose.Promise = global.Promise;

// criando o modelo do banco de dados

const postSchema = new mongoose.Schema({
    photo: String,
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
    tags:[String],
    author: objectId

});

// criando o slug

postSchema.pre('save', async function(next) { // essa função com next é um middleware 

    if(this.isModified('title') === true) { // se esse objeto title foi modificado

        // o slug atual recebe a função slug() com 2 parâmetros
        // this.title, que éo title atual a ser modificado e
        // {lower:true} recebe o slug em minúsculo

        this.slug = slug(this.title, {lower: true}); // ele fará a validação do slug gerado

        const slugRegex = RegExp(`^(${this.slug})((-[0,9]{1,}$)?)$`, 'i'); // regex do slug

        //coloca os slug no construtor para ser enviado antes da criação esse padrão de regex

        const slugPost = await this.constructor.find({slug: slugRegex});

        if(slugPost.length > 0) { //se tiver algum slug existente, atribuirá esse slug + 1

            this.slug = `${this.slug}-${slugPost.length + 1}`;

        }

        next();   

    }
});

postSchema.statics.getTagsList = function () {

    return this.aggregate([

        {$unwind: '$tags'},
        {$group: {_id: '$tags', count: {$sum: 1} } },
        {$sort: {count: -1}}

    ]);
}

postSchema.statics.findPosts = function (filter = {}) {

    return this.aggregate([

        { $match: filter }, // equivalente a função de find(postFilter)
        { $lookup: {
            from: 'users',
            let: {'author': '$author'},
            pipeline: [
                { $match: { $expr: { $eq: ['$$author', '$_id'] } } },
                { $limit: 1}
            ],
            as: 'author'
        }},
        { $addFields: {

            'author': { $arrayElemAt: ['$author', 0] }
        } }

    ])
}

module.exports = mongoose.model('Post', postSchema);