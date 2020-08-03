const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');

exports.view = async(req, res) => {
    const post = await Post.findOne({slug: req.params.slug});

    res.render('view', {post});
}

// Acessa o postAdd

exports.add = (req, res) => {

    res.render('postAdd');
};

// adiciona via post o que foi mandado no corpo da requisição para o BD

exports.addAction = async(req, res) => {

 req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
    
 const post = new Post(req.body); // cria o novo post

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

    res.render('postEdit', { post } );

}

exports.editAction = async(req, res) => {

    try {

        req.body.slug = slug(req.body.title, {lower: true}); // Ele passa o slug para o body
        req.body.tags = req.body.tags.split(',').map(tag => tag.trim()); // Configura as tags, separando as strings por array

        // findOneAndUpdate recebe 3 parâmetros
        // 1. recebe o slug que foi solecionado slug: req.params.slug
        // 2. recebe o req.body que foi modificado
        // 3. um objeto com 2 propriedades: new: true (significa que recebe um novo registro)
        // runValidators: true (faz a validação do novo registro)
    
        const post = await Post.findOneAndUpdate(   // função que recebe um registro e atualiza
            {slug: req.params.slug}, // recebe o slug a ser atualizado
            req.body, // recebe a atualização
            {
                new: true, // novo registro atualizado
                runValidators: true // validando os campos atualizados
    
            }
            
        ); 
        
    } catch(error) {

        req.flash('error', 'O post não foi atualizado! Tente novamente.'); // mensagem de erro da atualziação
        res.redirect('/post/'+ req.params.slug +'/edit'); // redireciona ao edit

    }
   
    req.flash('success', 'Post atualizado com sucesso!'); // mensagem flash de sucesso
        res.redirect('/'); // redireciona para a rota default
        
}

exports.delete = async(req, res) => {

    let deletePost = req.params.slug;

    try {

        await Post.findOneAndDelete({slug: deletePost});

    } catch(error) {

        req.flash('erro', 'Erro ao deletar o post! Tente novamente');
        res.redirect('/post'+ req.params.slug + '/delete');

    }

    req.flash('success', 'Sucesso ao excluir o post');
    res.redirect('/');
}

