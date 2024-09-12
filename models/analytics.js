const mongoose = require('mongoose');



const analyticSchema = new mongoose.Schema({
    totalSpend: Number,
    individualSpend: Number,  
})