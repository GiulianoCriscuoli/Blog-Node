// A função verifica se o usuário é autenticado

module.exports.isLogged = (req, res, next) => {

    if(!req.isAuthenticated()) {
        
        req.flash('error', 'Você precisa estar logado para efetuar esta ação =)');
        res.redirect('/users/login');
        return;

    }

    next();

}