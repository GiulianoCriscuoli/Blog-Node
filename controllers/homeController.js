const mongoose = require('mongoose');
const Post = mongoose.model("Post");

// as funções que mexem com banco de dados precisam ser async

exports.index =  async (req, res) => {

    let responseJson = {

        posts:[]

    };

    const posts = await Post.find(); //find() retorna toda a lista no mongo
    responseJson.posts = posts;

    res.render('home', responseJson);

};