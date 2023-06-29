const { Schema, model } = require('mongoose');

const l2m = new Schema({
  pr_type: {type:String},
  server: {type:String},
  under_server: {type:String},
  seller: {type:Number},
  class: {type:String},
  level: {type: Number},
  cost: {type: Number},
  description: {type: String},
  photos: {type: String},
  invis: {type: Boolean},
}, { versionKey: false, collection:"l2m" });


module.exports = model("l2m", l2m) 