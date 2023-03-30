<template>
    <div class="main">
        <transition>
            <div v-if="loaded"> <!--Best solution for waiting mounted state by getting some info from server-->
                <div class="d-flex justify-content-between p-2">
                    <div><img class="home" style="width: 30px; height: 30px;" @click="home" src="../assets/logo.png" alt=""><span style="vertical-align: middle; margin-left: 5px;">Free2Pay</span></div>
                    <transition name="slide-fade">
                        <div v-if="!show" class="д">
                            <router-link v-if="adm" class="l" style="margin-right:400px;" to="/AdminPanel" >Admin panel</router-link>
                            <button v-if="!show" class="btn btn-danger"  @click="logout">Exit</button>
                        </div>      
                    </transition>
                    <img class="pop" @click="popup" src="../assets/ppi.png" style="width: 4%; height: 4%;">  
                </div>
                <br><br>
                
                <p class="mt-2">{{user["local_name"]}}</p>
               
               
                
            </div>
        </transition>
 
    </div>
</template>
<script>
import serv from '../api/serv'
export default {
        /* eslint-disable */
    name:"Profile",
   
    async beforeCreate(){
        if(!localStorage.id){
            this.$router.push('login')
        }else{
            const resp = await serv.getUserById(localStorage.id)
            this.user = resp.data
            this.user.status == 'Admin' ? this.adm = true : this.adm = false
            
    
            this.loaded = true
        }
    },
    data(){
        return{
            user:{},
            loaded:false,
            adm:false,
            show:true
            
        }
    },
    methods:{
 
        popup(){
            this.show = !this.show
        },
        home(){
            this.$router.push('/')
        },
        logout(){
            localStorage.removeItem('id')
            this.$router.push('login')
        }
    },
  
}
</script>
<style scoped>
.home{
  transition: all 0.6s;
}
.home:hover{
  filter: drop-shadow(5px 5px 5px #40b782);
}
.pop{
  transition: all 0.6s;
}
.pop:hover{
   
  filter: drop-shadow(3px 5px 5px white);
}

.im{
    transition: all 0.4s;
}
.im:hover{
    /* box-shadow: 0px 5px 10px 0px white; */
    filter: drop-shadow(5px 5px 5px white);
}


.v-enter-active{
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}



.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}



.l{
  text-decoration: none;
  color: white;
  transition:all 0.7s;
}
.l:hover{
  
  color:white;
  text-shadow: 1px 1px 2px gray, 0 0 1em white, 0 0 0.2em white;
  
}
</style>