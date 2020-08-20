const User = require("../models/User");

exports.login = (req, res) => {

    res.render('login');
}

exports.loginAction = async(req, res) => {

     const auth = await User.authenticate();

    auth(req.body.email, req.body.password, (error, result) => {
        if(!result) {

            req.flash('error', 'Seu email ou senha estão incorretos');
            res.redirect('/users/login');
            return;

        } 

            req.login(result, () => {});

            req.flash('success', 'Você foi logado com sucesso!');
            res.redirect('/');

    });

}

exports.register = (req, res) => {

    res.render('register');

}

exports.registerAction = async(req, res) => {

    try {

        const newUser = await User.register(new User(req.body), req.body.password);
        req.flash('success', 'Cadastro realizado com sucesso');
        res.redirect('/users/login');


    } catch(e) {
        req.flash('error', 'Erro ao se cadastrar! Tente novamente.');
        res.redirect('/users/register');

    }
}

exports.logout = (req, res) => {

    req.logout();
    res.redirect('/');

}