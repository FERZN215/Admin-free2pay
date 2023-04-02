const { Router } = require('express')
const users = require('../models/users')
const chats = require('../models/chats')
const deals = require('../models/deals')
const cfg = require('../../conf')
const RSA = require('node-rsa')
const axios = require('axios');

const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const qiwiApi = new QiwiBillPaymentsAPI(cfg.secret_key )

const router = Router()
//this 2 functions below useless at least now
console.log(1)
const changeStream = users.watch();


const bibos = axios.create({
    baseURL: 'http://127.0.0.1:5000/',  
  })
 

changeStream.on('change', (change) => {
  console.log('Изменение в коллекции пользователей:', change);
});

function encrypt(value){
    const key = new RSA(cfg.rsa_key)
    return key.encrypt(value, 'base64')
}
function decrypt(value){
    const key = new RSA(cfg.rsa_key)
    return key.decrypt(value, 'utf8');
}

 
router.post('/login', async (req, res) => {
    
    const { name, pass } = req.body//getting 2 vars from client
    console.log(name,pass)
    const user = await users.findOne({ "local_name":name, "password":pass })//search in db

    if (user) {//if user exist
        res.send(user)
    }else{
        res.send(false)
    }
  
})


router.post('/userById', async (req, res) => {
    const user = await users.findById(req.body._id)//finding user by id, which getting from client request

    res.send(user)//sending user
})

router.post('/getChat', async(req,res)=>{
    const chat = await chats.findOne({"_id": req.body._id})
    if(chat)
        res.send(chat)
    else
        res.send(false)
})


router.post('/getUserByTgId', async function(req, res){
    const user = await users.findOne({"telegram_id":req.body._id})
    if(user)
        res.send(user)
    else
        res.send(false)

})

router.post('/sendMsg', async(req,res)=>{
    const {msg, chat_id, cur_id} = req.body
    const admin = await users.findOne({"_id":cur_id})
    const result = await chats.updateOne({"_id":chat_id},{"$push":{"msgs":{
        "from":admin["telegram_id"],
        "text":msg
    }}})

    bibos.post('newmsg', {'chat_id': chat_id})
    .then(response => {
        console.log(response.data); 
    })
    .catch(error => { 
        console.log(error); 
    }); 

    if(result.acknowledged)
        res.send(true)
    else
        res.send(false)
})

router.post('/addWarn', async(req,res)=>{//genius warn system
    const {_id} = req.body


    let status = await users.updateOne({"_id":_id}, {"$inc":{"warns":1}})
    
    if(status.acknowledged)
        res.send(true)
    else
        res.send(false)

})

router.get('/getUsers', async(req,res)=>{//all users for adm panel
    const user = await users.find()
    res.send(user)
})

router.post('/editUser' , async(req,res)=>{
   
    const {user} = req.body
    const status = await users.updateOne({"_id":user["_id"]}, {
        "$set":{
            "local_name":user["local_name"], 
            "password":user["password"],
            "status":user["status"], 
            "warns":user["warns"], 
            "balance":user["balance"]
        }})

    if (status.acknowledged)
        res.send(true)
    else
        res.send(false)

})

router.post('/getDealById', async function(req, res){
    const deal = await deals.findOne({"_id":req.body._id})
    if(deal)
        res.send(deal)
    else
        res.send(false)

})

router.post('/editDeal' , async(req,res)=>{
   
    const {deal} = req.body
    const status = await deals.updateOne({"_id":deal["_id"]}, {
        "$set":{
            "status":deal["status"],
            "game": deal["game"],
            "category": deal["category"],
            "seller": deal["seller"],
            "seller": deal["seller"],
            "buyer": deal["buyer"],
            "cost": deal["cost"],

        }})
    bibos.post('deal_change', {'deal': deal})
    .then(response => {
        console.log(response.data); 
    })
    .catch(error => { 
        console.log(error); 
    }); 


    if (status.acknowledged)
        res.send(true)
    else
        res.send(false)

})



module.exports = router