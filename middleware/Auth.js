const screteKey = 'mynameisshreyahbansode';
const jwt = require('jsonwebtoken');
const model = require('../models/userModal')


exports.verifyUser = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'No token provided'
            });
        }
        const varifyToken = jwt.verify(token, screteKey);
        const root = await model.find({ _id: varifyToken._id });
        next();
        if (root) {
            res.send({
                success: true,
                message: 'user varify',
                data: root
            })

        }
    }
    catch (err) {
        res.send({
            status: 401,
            success: false,
            message: "failed to varify user"
        })
    }

}



exports.verifyApi = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'No token provided'
            });
        }
        const varifyToken = jwt.verify(token, screteKey);
        const root = await model.find({ _id: varifyToken._id });
        if (root) {
            next();
        }
    }
    catch (err) {
        res.send({
            status: 401,
            success: false,
            message: "failed to varify user"
        })
    }

}