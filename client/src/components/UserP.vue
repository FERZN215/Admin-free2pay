<template>
    <div>
        <div class="user">
            <router-link class="l" :to="'/UserEdit/'+product._id">Name:{{product.local_name}}</router-link>
            <p>Warn Count:{{product.warns}}</p>

        </div>
    </div>
</template>
<script>
export default {
    props:{
        product:{
            type:Object,
            required:true
        }
    }
    
}
</script>
<style>
    .user{
        padding: 10px;
        margin-left: auto;
        margin-right: auto;
        width:50%;
        border: 3px solid white;
        border-radius: 10px;

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