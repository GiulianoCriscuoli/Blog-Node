const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const slug = require('slug');


exports.add = (req, res) => {

    res.render('postAdd');
};

exports.addAction = async (req, res) => {
    
 const post = new Post(req.body);

    try {

        await post.save();


    } catch(error) {

        req.flash('error', 'Deu erro ao salvar o post');
        res.redirect('/post/add');
        
    }
 

 req.flash('success', 'Post salvo com sucesso!');
 res.redirect('/');
    
};

