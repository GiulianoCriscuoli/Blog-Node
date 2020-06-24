const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const postController = require('../controllers/postController');




router.get('/', homeController.index);
router.get('/post/add', postController.add);
router.post('/post/add', postController.addAction);


module.exports = router;