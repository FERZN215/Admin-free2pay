<template>
    <div>
        <div class="d-flex justify-content-between p-2">
            <div><img class="home" style="width: 30px; height: 30px;" @click="home" src="../assets/logo.png" alt=""><span style="vertical-align: middle; margin-left: 5px;">RedNeck</span></div>
        </div>
        <br>

        <input v-model="name" type="text" placeholder="Login"><br>
        <input v-model="pass" type="password" placeholder="Password" class="mt-1"><br>
        <button @click="login" class="btn btn-success mt-2">Login</button><br>
        <br>


    </div>
</template>
<script>
import serv from '../api/serv'
export default {
        /* eslint-disable */
    name:"Login",
    data(){
        return{
            name:"",
            pass:""
        }
    },
    methods:{
        home(){
           this.$router.push('/')
        },
        
        async login(){
            // some stuff
           
            
            const resp = await serv.authorization(this.name, this.pass)
            const data = resp.data
            console.log(data)
            if(data == false){
                alert('smth went wrong')
                this.name = "",
                this.pass = ""
            }
            else{
                localStorage.id = data._id
                this.$router.push('profile')
            }
        },
    },

    beforeCreate(){
        if(localStorage.id){
            this.$router.push('profile')
        }
    }
}
</script>
<style>
    
</style>