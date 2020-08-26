exports.defaultTitle = "Home"; //menu da tela principal


exports.menu = [  //menu da tela principal

    {name:'Home', slug:'/', guest: true, logged: true},
    {name: 'Cadastrar', slug: '/users/register', guest: true, logged: false},
    {name:'Login', slug:'/users/login', guest: true, logged: false },
    {name:'Adicionar post', slug:'/post/add', guest: false, logged: true},
    {name: 'Sair', slug: '/users/logout', guest: false, logged: true}
]
