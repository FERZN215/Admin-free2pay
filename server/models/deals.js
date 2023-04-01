const { Schema, model } = require('mongoose');

const mydata = new Schema({
  status: {type:String},
  game: {type:String},
  category: {type:String},
  seller: {type:Number},
  buyer: {type:Number},
  offer_id: {type: Schema.Types.ObjectId},
  cost: {type: Number},
}, { versionKey: false });


module.exports = model('active_deals', mydata) 