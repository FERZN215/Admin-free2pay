<template>
    <div>
        <div class="main" v-if="loaded">

            <!-- username:{type:String},
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
    warns:{type:Number} -->

            <p class="mt-2">Name</p>
            <input type="text" v-model="user.local_name"> 
            
            <p class="mt-2">Pass</p>
            <input type="text" v-model="user.password">

            <p class="mt-2">Status</p>
            <input type="text" v-model="user.status">

            <p class="mt-2">Warns</p>
            <input  type="number" v-model="user.warns">

            <p class="mt-2">Balance</p>
            <input type="number" v-model="user.balance">

            
           



            
            
            <br>
            <button @click="edit" class="btn btn-success mt-2" >Edit</button>
        </div>
    </div>
</template>
<script>
import serv from '../api/serv'
export default {
    data(){
        return{
            user:{},
            loaded:false
        }
    },
    methods: {
      async edit(){
        const resp = await serv.editUser(this.user)
        if(resp.data)
            this.$router.push('/AdminPanel')
        else
            alert('smth went wrong')
      }  
    },
    async beforeCreate(){
        const resp = await serv.getUserById(this.$route.params.id)
        const data = resp.data
        this.user = data


        
        this.loaded = true;

    }
}
</script>
<style>
    
</style>

