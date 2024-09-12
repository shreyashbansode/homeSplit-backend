const expanseModel = require('../models/expance');
const groupModal = require('./../models/createGroup');
const screteKey = 'mynameisshreyahbansode';
const jwt = require('jsonwebtoken');
const model = require('../models/userModal')


exports.createExpance = async (req, res) => {
    try {
        const { groupID } = req.params;
        const { token } = req.headers;
        const findGroup = await groupModal.findOne({ groupID });
        const distributeArr = [];
        if (req.body?.splitMethod == 'Equally') {
            findGroup?.groupList?.forEach((item) => {
                distributeArr.push({
                    [item]: req.body?.perPersonAmount
                })
            })

        }
        const varifyToken = jwt.verify(token, screteKey);
        const root = await model.find({ _id: varifyToken._id });
        let bodyTosave = {
            groupID: parseInt(groupID),
            name: req.body?.name,
            splitMethod: req.body?.splitMethod,
            amount: req.body?.amount,
            perPersonAmount: req.body?.perPersonAmount,
            distribute: req.body?.splitMethod == 'Equally' ? [...distributeArr] : req.body.distribute,
            submitAuthor: root[0]?.email
        }
        const saveExpance = await new expanseModel(bodyTosave).save();
        if (saveExpance) {
            res.send({
                success: true,
                message: 'Expace created successfully',
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Failed to create expance',
            })
        }
    } catch (err) {
        res.status(401).send({
            success: false,
            message: 'Failed to create expance',
        })
    }

}


exports.getExpances = async (req, res) => {
    try {
        const { groupID } = req.params;
        const findPerticularExpanse = await expanseModel.find({ groupID });
        if (findPerticularExpanse) {
            res.status(201).send({
                success: true,
                message: "Expance fetched succefully",
                data: findPerticularExpanse
            })
        } else {
            res.status(201).send({
                success: false,
                message: "Failed to fetched data"
            })
        }
    } catch (err) {
        res.status(201).send({
            success: false,
            message: "Failed to fetched data"
        })
    }
}


exports.deleteExpanse = async (req, res) => {
    try {
        const { expanceID } = req.params;
        const deleteExpance = await expanseModel.findOneAndDelete({ _id: expanceID });

        if (deleteExpance) {
            res.send({
                success: true,
                message: 'Expance delete successfully'
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Failed to delete Expance'
            })
        }
    } catch (err) {
        res.status(401).send({
            success: false,
            message: 'Failed to delete Expance'
        })
    }
}


exports.updateExpance = async (req, res) => {

    try {
        const { expanceID } = req.params;
        const { token } = req.headers
        const varifyToken = jwt.verify(token, screteKey);
        const root = await model.find({ _id: varifyToken._id });
        let bodyToUpdate = {
            ...req.body,
            submitAuthor: root[0]?.email
        }
        const updatedGroup = await expanseModel.findOneAndUpdate({ _id: expanceID }, bodyToUpdate, { new: true });
        if (updatedGroup) {
            res.send({
                success: true,
                message: 'Expance update successfully'
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to update expance'
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: 'Failed to update expance'
        })
    }
}
