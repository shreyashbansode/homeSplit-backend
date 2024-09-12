const express = require('express');
const routes = express();
const expanseController = require('../controllers/expance');
const middleware = require('../middleware/Auth')

routes.post('/save/:groupID', middleware.verifyApi, expanseController.createExpance);
routes.get('/get/:groupID', middleware.verifyApi, expanseController.getExpances)
routes.delete('/delete/:expanceID', middleware.verifyApi, expanseController.deleteExpanse);
routes.put('/update/:expanceID', middleware.verifyApi, expanseController.updateExpance);

module.exports = routes;
