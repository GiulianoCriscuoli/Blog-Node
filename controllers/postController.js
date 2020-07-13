const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

// Acessa o postAdd

exports.add = (req, res) => {

    res.render('postAdd');
};

// adiciona via post o que foi mandado no corpo da requisição para o BD

exports.addAction = async (req, res) => {
    
 const post = new Post(req.body);

    try {

        await post.save(); // salva o post


    } catch(error) {

        req.flash('error', 'Deu erro ao salvar o post');
        res.redirect('/post/add');
        
    }
 
 req.flash('success', 'Post salvo com sucesso!');
 res.redirect('/');
    
};

// acessa o slug que será editado

exports.edit = async(req, res) => {

    const post = await Post.findOne({ // função que retorna um item

        slug: req.params.slug // passa o valor do slug que está no param para o slug do BD

    });

    res.render('postEdit', post);

}

exports.editAction = async(req, res) => {

    // findOneAndUpdate recebe 3 parâmetros
    // 1. recebe o slug que foi solecionado slug: req.params.slug
    // 2. recebe o req.body que foi modificado
    // 3. um objeto com 2 propriedades: new: true (significa que recebe um novo registro)
    // runValidators: true (faz a validação do novo registro)

    const post = await Post.findOneAndUpdate(   // função que recebe um registro e atualiza
        {slug: req.params.slug},
        req.body,
        {
            new: true,
            runValidators: true

        }
        
        ); 

        req.flash('success', 'Post atualizado com sucesso!');
        res.redirect('/');
        
}

