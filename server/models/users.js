const {Schema, model} = require('mongoose')

const mydata = new Schema({

    username:{type:String},
    local_name: {type:String},
    telegram_id:{type:Number},
    password:{type:String},
    status:{type:String},
    balance:{type:Number},
    bill_id:{type:String},
    chats:{type:Array},
    freeze_balance:{type:Array},
    statistics:{
        total:{type:Number},
        successful:{type:Number},
        arbitration:{type:Number}
    },
    reviews:{type:Array},
    deals:{type:Array},
    warns:{type:Number}

   
},{versionKey: false})


module.exports = model('users', mydata) 