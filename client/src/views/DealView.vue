<template>
    <div class="main">
        <p class="mt-2">Игра</p>
        <input type="text" v-model="deal.game"> 

        <p class="mt-2">Категория</p>
        <input type="text" v-model="deal.category">

        <p class="mt-2">Покупатель</p>
        <input type="text" v-model="deal.buyer">

        <p class="mt-2">Продавец</p>
        <input  type="text" v-model="deal.seller">

        <p class="mt-2">Цена</p>
        <input type="number" v-model="deal.cost">

        <p class="mt-2">Статус</p>
        <input type="text" v-model="deal.status"><br>
        <button @click="edit" class="btn btn-success" >Edit</button>
    </div>
</template>
<script>

import serv from '../api/serv'
export default {
    data(){
        return{
            deal:{},
            loaded:false
        }
    },
    methods: {
      async edit(){
        const resp = await serv.editDeal(this.deal)
        if(resp.data)
            this.$router.push('/AdminPanel')
        else
            alert('smth went wrong')
      }  
    },
    async beforeCreate(){
        const resp = await serv.getDeal(this.$route.params.id)
        const data = resp.data
        this.deal = data


        
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

    button{
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>