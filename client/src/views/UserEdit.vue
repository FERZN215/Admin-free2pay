<template>
    <div>
        <div class="main" v-if="loaded">


            <p class="mt-2">Имя</p>
            <input type="text" v-model="user.local_name"> 
            
            <p class="mt-2">Пароль</p>
            <input type="text" v-model="user.password">

            <p class="mt-2">Статус</p>
            <input type="text" v-model="user.status">

            <p class="mt-2">Предупреждения</p>
            <input  type="number" v-model="user.warns">

            <p class="mt-2">Баланс</p>
            <input type="number" v-model="user.balance">

            <div class="statistic">
                <h4>Статистика</h4>
                <label for="total">Все</label>
                    <input type="number" id="total" name="total" v-model="user.statistics.total"><br>
                <br>
                <label for="successfull">Успешные</label>
                    <input type="number" id="successfull" name="successfull" v-model="user.statistics.successful"><br>
                <br>
                <label for="arbitr">Арбритражы</label>
                    <input type="number" id="arbitr"  v-model="user.statistics.arbitration"><br>
                <br>
               

            </div>

            <button @click="edit" class="btn btn-success" >Edit</button>
            <div class="chats">
                <h4>Чаты</h4>
                <div v-for="chat in user.chats" :key="chat" >
                    <div class="chat">
                        <router-link class="l" :to="'/Chat/'+chat">Чат</router-link>
                        
                    </div>
                </div>
            </div>
            
            <div class="deals">
                <h4>Сделки</h4>
                <div v-for="deal in user.deals" :key="deal" >
                    <div class="deal">
                        <router-link class="l" :to="'/Deal/'+deal">Сделка</router-link>
                        
                    </div>
                </div>
            </div>

            <div></div>
            
            
            
            
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
<style scoped>
    .statistic{
        padding: 5px;
        margin: auto;
        width:30%;
        border: 3px;
        border-style: solid;
        border-color: rgb(82, 82, 82);
        border-radius: 8px;
        margin-top: 10px;
    }
    .statistic label{
        float: left;
    }
    .statistic input{
        float: right;
    }
    .chats{
        width: 45%;
        padding: 10px;
        border: 3px;
        border-style: solid;
        border-color: rgb(82, 82, 82);
        border-radius: 8px;
        margin-top: 100px;
        margin-left: 40px;
        margin-bottom: 10px;
        float: left;
    }
    .deals{
        width: 45%;
        padding: 10px;
        border: 3px;
        border-style: solid;
        border-color: rgb(82, 82, 82);
        border-radius: 8px;
        margin-top: 100px;
        margin-right: 40px;
        margin-bottom: 10px;
        float: right;
    }
    button{
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>

