const { Router } = require('express')
const users = require('../models/users')
const cfg = require('../../conf')
const RSA = require('node-rsa');

const QiwiBillPaymentsAPI = require('@qiwi/bill-payments-node-js-sdk');
const qiwiApi = new QiwiBillPaymentsAPI(cfg.secret_key )

const router = Router()
//this 2 functions below useless at least now
console.log(1)
const changeStream = users.watch();

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



module.exports = router