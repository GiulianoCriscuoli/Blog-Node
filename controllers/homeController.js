const mongoose = require('mongoose');
const { response } = require('express');
const Post = mongoose.model("Post");

// as funções que mexem com banco de dados precisam ser async

exports.index =  async (req, res) => {

  const responseJson = { // recebe um json com o array posts.

    'posts':[], // recebe os posts
    'tags':[], // recebe as tags
    'tag': ''

  }

  responseJson.tag = req.query.t // pega a informação que vem da query e passa para tag

  const postFilter = (typeof responseJson.tag != 'undefined') ? {tags: responseJson.tag}: {};

  const postsPromise = Post.find(postFilter); // find é uma função do mongoDB para listar todos os posts
  const tagsPromise = Post.getTagsList(); // acessa a lista de tags 

  // Faz uma promise e recebe o resultado delas nas variáveis posts e tags

  const [posts, tags] = await Promise.all([postsPromise, tagsPromise])

  // verifica se o id da tag no loop é igual a tag selecionada pelo uusário

  for(let i in tags) {

    if(tags[i]._id === responseJson.tag) {

      tags[i].class = "selected"; // se for igual, atribui um "selected para a classe selecionada"

    }
  }

  //manda o resultado para posts e tags, para ser exibido no front

  responseJson.posts = posts;
  responseJson.tags = tags;
  
  res.render('home', responseJson);

};