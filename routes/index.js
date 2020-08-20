const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');
const imageMiddleware = require('../middlewares/imageMiddleware');
const userController = require('../controllers/userController');

// rotas configuradas no sistema

router.get('/', homeController.index);

router.get('/users/register', userController.register);
router.post('/users/register', userController.registerAction);

router.get('/users/login', userController.login);
router.post('/users/login', userController.loginAction);

router.get('/users/logout', userController.logout);

router.get('/post/add', postController.add);
router.post('/post/add', 
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction
);

router.get('/post/:slug/edit', postController.edit);
router.post('/post/:slug/edit', 
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction
);

router.get('/post/:slug/delete', postController.delete);

router.get('/post/:slug', postController.view);

module.exports = router;