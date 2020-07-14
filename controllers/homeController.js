const mongoose = require('mongoose');
const Post = mongoose.model("Post");

// as funções que mexem com banco de dados precisam ser async

exports.index =  async (req, res) => {

  let responseJson = { // recebe um json com o array posts.

    posts: [] // recebe os posts

  }

  const posts = await Post.find(); // find é uma função do mongoDB para lsitar todos os posts

  responseJson.posts = posts; // response.posts recebe os posts para listar

  res.render('home', responseJson);

};