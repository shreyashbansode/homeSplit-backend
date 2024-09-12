const mongoose = require('mongoose');
const expanceSchema = new mongoose.Schema({
    groupID: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    splitMethod: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    perPersonAmount: {
        type: Number,
        require: true
    },
    distribute: {
        type: Array,
        require: true
    },
    submitAuthor: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('expanceData', expanceSchema);