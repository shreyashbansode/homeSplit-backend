const mongoose = require('mongoose');

const createGroupSchema = new mongoose.Schema({
    groupID: Number,
    groupName: String,
    groupList: Array,
})

module.exports = mongoose.model('createGroup', createGroupSchema);