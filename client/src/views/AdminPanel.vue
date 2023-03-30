<template>
    
    <div>
        
        <transition>
            <div class="AdminPanel" v-if="loaded">
                <div id="staggered-list-demo" >
                    
                    <input v-model="searchINP" @input="searchFN" type="text" class="mt-4 mb-3" placeholder="Search">
                    <p>Admin Panel</p>
                    
                    <div  v-if="newArr.length == 0">
                        <div  class="c" v-for="us in users" :key = "us">
                            <UserP :product="us" />
                        </div>
                    </div>
                    <div>
                        <transition-group
                            name="staggered-fade"
                            tag="ul"
                            v-bind:css="false"
                            v-on:before-enter="beforeEnter"
                            v-on:enter="enter"
                            v-on:leave="leave"
                        >
                        <div  class="c" v-for="us in newArr" :key = "us">
                            <UserP :product="us" />
                        </div>
                        </transition-group>
                    </div>
                </div>

            </div>  
        </transition>
        
    </div>
</template>
<script>
import Velocity from 'velocity-animate'
import serv from '@/api/serv';
import UserP from '../components/UserP.vue'
export default {
    el: '#staggered-list-demo',
    components:{
        UserP
    },
    methods:{

        beforeEnter: function (el) {
            el.style.opacity = 0
     
        },
        enter: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                el,
                { opacity: 1 },
                { complete: done }
                )
            }, delay)
        },
        leave: function (el, done) {
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                el,
                { opacity: 0, height: 0 },
                { complete: done }
                )
            }, delay)
        },
        searchFN(){
            const search = this.searchINP.toLowerCase();
            this.newArr = []
            for(let i =0; i <this.users.length; i++){
                if(this.users[i].local_name.toLowerCase().indexOf(search) != -1)
                    this.newArr.push(this.users[i])
            }
        }

    },


    data(){
        return{
            users:[],
            loaded:false,
            searchINP:"",
            newArr:[]
        }
    },
    async beforeCreate() {
        if(!localStorage.id)
            this.$router.push('login')
        
        const resp = await serv.getUserById(localStorage.id)
        const data = resp.data
        if(data.status != 'Admin'){
            const resp = await serv.addWarn(localStorage.id)
            if(resp.data)
                this.$router.push('profile')
            else{
                localStorage.removeItem('id')
                this.$router.push('login')

            }
        }
        else{
            const resp = await serv.getUsers()
            this.users = resp.data
            this.loaded = true
        }
            
        
    },
}
</script>
<style>
    .v-enter-active{
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.c{
    margin-bottom: 20px;
}
</style>