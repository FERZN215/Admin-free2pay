const express = require('express')
const BP = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('mongoose')
const api = require('./api/api')
const cookieParser = require('cookie-parser')
const cfg = require('../conf')


const app = express() 

app.use(morgan('combined'))
app.use(BP.json())
app.use(cors())
app.use(BP.urlencoded({extended:true}))
app.use(cookieParser());


app.use('/', api)






async function start(){
    
   await mongo.connect(cfg.db_uri)

    app.listen(cfg.port, ()=>{
        console.log(`this work ${cfg.port} port` )
    })
    
}
start()