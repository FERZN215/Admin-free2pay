const {Schema, model} = require('mongoose')

const mydata = new Schema({
    offer:{type:String},
    game:{type:String},
    source:{type:Number},
    target:{type:Number},
    msgs:{type:Array}

    // img:{type: String}
},{versionKey: false})


module.exports = model('chats', mydata) 