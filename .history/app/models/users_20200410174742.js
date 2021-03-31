const  mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {type: String,required: true},

});

model('User', userSchema);