const express = require('express');
const routes = express();
const createGroupController = require('../controllers/createGroup');
const middleware = require('../middleware/Auth')

routes.post('/save', middleware.verifyApi, createGroupController.saveGroup);
routes.get('/get', middleware.verifyApi, createGroupController.getGroupData);
routes.delete('/delete/:groupID', middleware.verifyApi, createGroupController.deleteGroupData);
routes.get('/get/:groupID', middleware.verifyApi, createGroupController.getPerticularGroupData);
routes.put('/update/:groupID', middleware.verifyApi, createGroupController.updateGroupData)
module.exports = routes;
