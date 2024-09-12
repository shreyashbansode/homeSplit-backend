const { model } = require('mongoose');
const createGroupModal = require('../models/createGroup');


exports.saveGroup = async (req, res) => {
    try {
        let previousData = await createGroupModal.find();
        if (!previousData.length) {
            let lastObj = previousData[previousData.length - 1];
            let groupID = lastObj ? lastObj.groupID : 0;
            req.body = { ...req.body, groupID }
        } else {
            let lastObj = previousData[previousData.length - 1];
            let groupID = lastObj.groupID + 1;
            req.body = { ...req.body, groupID }
        }
        let savedData = await new createGroupModal(req.body).save();
        if (savedData) {
            res.send({
                success: true,
                message: 'Group created successfully',
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to create group',
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: 'Failed to create group',
        })
    }

}

exports.getGroupData = async (req, res) => {
    try {

        const getGroupData = await createGroupModal.find();
        
        if (getGroupData) {
            res.send({
                success: true,
                message: 'Groupdata successfully fetched',
                data: getGroupData
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to fetch data'
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: 'Failed to fetch data'
        })
    }
}

exports.deleteGroupData = async (req, res) => {
    try {
        const { groupID } = req.params;
        const deleteData = await createGroupModal.findOneAndDelete({ groupID: groupID });
        if (deleteData) {
            res.send({
                success: true,
                message: 'Group deleted successfully',
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to delete group',
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: 'Failed to delete group',
        })
    }

}

exports.getPerticularGroupData = async (req, res) => {
    try {
        const { groupID } = req.params;
        const findGroup = await createGroupModal.findOne({ groupID });

        if (findGroup) {
            res.send({
                success: true,
                message: 'Data fetched successfully',
                data: findGroup
            })
        } else {
            res.send({
                success: false,
                message: 'Failed to fetched data',
            })
        }
    }
    catch (err) {
        res.send({
            success: false,
            message: 'Failed to fetched data',
        })
    }

}

exports.updateGroupData = async (req, res) => {
    try {
        const { groupID } = req.params;
        const updatedGroup = await createGroupModal.findOneAndUpdate({ groupID: groupID }, req.body, { new: true });
        if (!updatedGroup) {
            return res.status(404).send({
                success: false,
                message: 'Group not found'
            });
        }
        res.send({
            success: true,
            message: 'Group updated successfully',
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Failed to update group'
        });
    }
};
