const express = require('express');
const routes = express.Router();
const middleware = require('../middleware/Auth')
routes.post('/register', require('../controllers/userModal').createUser);
routes.post('/login', require('../controllers/userModal').getUser);
routes.get('/varify', require('../middleware/Auth').verifyUser);
routes.post('/send', middleware.verifyApi, require('../controllers/userModal').sendOtp);
routes.post('/varifyOtp', require('../controllers/userModal').varifyOtp);
routes.get('/list', middleware.verifyApi, require('../controllers/userModal').getUserList)
module.exports = routes;
