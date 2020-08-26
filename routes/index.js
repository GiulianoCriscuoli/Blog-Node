const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');


// rotas configuradas no sistema

router.get('/', homeController.index);

router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);

router.get('/users/login', userController.login);
router.post('/users/login', userController.loginAction);

router.get('/users/logout', userController.logout);

router.get('/post/add',authMiddleware.isLogged,
    postController.add);
router.post('/post/add', 
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
);

router.get('/post/:slug/edit', authMiddleware.isLogged,
    postController.edit);
router.post('/post/:slug/edit',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction
);

router.get('/post/:slug/delete', authMiddleware.isLogged,
    postController.delete);

router.get('/post/:slug', postController.view);

module.exports = router;