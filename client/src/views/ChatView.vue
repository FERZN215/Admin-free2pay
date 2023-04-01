
<template lang="">
    <div class="main">
        <div class="chat" v-if="loaded">
            <div class="title">
                <p>{{source["local_name"]}}-{{target.local_name}}</p>
            </div>
            
           <div class="msg" v-for="(msg) in chat.msgs"  :key="msg">
                <p class = "left" v-if="msg.from == chat.source">{{source.local_name}}:{{msg.text}}</p>
                <p class = "right" v-else>{{target.local_name}}:{{msg.text}}</p>
           </div>


           
        </div>
        <input type="text" class="send" style="margin-right:5px;" v-model="msg_s" placeholder="Введите сообщение">
        <button  @click="send" class="btn btn-success"> Send</button>
    </div>
</template>

<script>
import serv from '../api/serv'
export default {
    data(){
        return{
            msg_s:"",
            chat:{},
            source:{},
            target:{},
            loaded:false
        }
    },
    methods:{
        async send(){
           
            const resp = await serv.sendMsg(this.msg_s, this.chat._id, localStorage.id )
            if (resp.data)
                this.msg_s = ""
            else{
                this.msg_s = ""
                alert("SMTH went wrong")
            }

        }
    },
    async created(){
        this.intervalId = setInterval(async () => this.chat = (await serv.getChat(this.chat._id)).data, 1000);
        
    },

    async beforeUnmount() {
        if (this.intervalId) clearInterval(this.intervalId)
    },
    async beforeCreate(){
        const resp = await serv.getChat(this.$route.params.id)
        const data = resp.data
        this.loaded = true
        if (data){
            this.chat = data
            this.source = (await serv.getUserByTgId(this.chat.source)).data
            this.target = (await serv.getUserByTgId(this.chat.target)).data
       
            
        }
        else
            this.$router.push('/AdminPanel')

    }
}
</script>

<style scoped>


    .send{
        padding: 5px;
        margin-top: 10px;
        border-radius: 8px;
        box-sizing: 2px;
        color: white;
        border-style: solid;
        background-color: #21252900;
    }

    .main{
        margin-top: 25px;
    }
    .chat .title{
        height: 40px;
        padding: 5px;
        border: 3px;
        border-style: solid;
        border-color: rgb(82, 82, 82);
        border-radius: 8px;
    }
    .chat{
        padding: 10px;
        padding-bottom: 20px;
        width: 50%;
        border-radius: 8px;
        margin: auto;
        background-color: #212529 ;
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    .msg{
        
        
        height:  40px;
       
        margin-top: 20px;
         
    }
    .msg .left{
        padding: 10px;
        border-radius: 10px;
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
        float: left;
    }
    .msg .right{
        float: right;
        padding: 10px;
        border-radius: 10px;
        box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
        
    }
</style>