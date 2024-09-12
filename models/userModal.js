const mongoose = require('mongoose');
const screteKey = 'mynameisshreyahbansode';
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobNumber: Number,
    email: String,
    otp: Number,
    token: [{
        tokens: {
            type: String,
            require: true
        }
    }]

})

userSchema.methods.generateAuthToken = async function () {
    let token23 = jwt.sign({ _id: this.id }, screteKey, { expiresIn: '1d' });
    this.token = this.token.concat({ tokens: token23 });
    await this.save();
    return token23
}
module.exports = mongoose.model('user', userSchema);


