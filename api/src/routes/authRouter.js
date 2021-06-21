
const express = require('express');
const router = express.Router();

// Middlewares
const auth = require('../middleware/customMiddleware');

// Policies
const PostPolicy = require('../Politicas/politicas');

// Controllers
const AuthController = require('../controllers/authController');
const PostController = require('../controllers/userController');


// Dos rutas: login y registro
// /api/singin & /api/singup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

// Rutas posts
// router.get('/api/posts', auth, PostController.index);
// router.get('/api/posts/:id', auth, PostController.find, PostPolicy.show, PostController.show);
// router.patch('/api/posts/:id', auth, PostController.find, PostPolicy.update, PostController.update);
// router.delete('/api/posts/:id', auth, PostController.find, PostPolicy.delete, PostController.delete);

module.exports = router;