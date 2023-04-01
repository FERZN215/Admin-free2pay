import api from './api'
export default {

    authorization(name, pass){
        return api().post('login', {name:name, pass:pass})
    },

    regestration(name,pass,email){
        return api().post('registr', {name:name, pass:pass, email:email})
    },

    getUserById(id){
        return api().post('userById', {_id:id})
    },

    // setEndDate(id, date){
    //     return api().post('SetEndDate', {_id:id, date:date})
    // },
    // buyHack(id, date, type){
    //     return api().post('buyHack', {_id:id, days:date, type:type})
    // },
    addWarn(id){
        return api().post('addWarn', {_id:id})
    },
    getUsers(){
        return api().get('getUsers')
    },
    editUser(user){
        return api().post('editUser', {"user":user})

    },
    genBill(id, type, days){
        return api().post('genBill', {_id:id, type:type, days:days})
    },
    check(id){
        return api().post('check', {_id:id})
    },
    getChat(id){
        return api().post('getChat', {_id:id})
    },
    getDeal(id){
        return api().post('getDealById', {_id:id})
    },
    editDeal(deal){
        return api().post('editDeal', {"deal":deal})

    },
    getUserByTgId(id){
        return api().post('getUserByTgId', {_id:id})
    }
    ,
    
    sendMsg(msg, chat_id, cur_id){
        return api().post('sendMsg', {msg:msg, chat_id:chat_id, cur_id:cur_id})
    }
   
}