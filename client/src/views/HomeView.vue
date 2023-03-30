<template>
  <div class="home" style="width: 100%;">
    <div class="d-flex justify-content-between p-2">
      <div><img  class="home"  style="width: 30px; height: 30px;" @click="home" src="../assets/logo.png" alt=""><span style="vertical-align: middle; margin-left: 5px;">Free2Pay</span></div>
      <router-link class = "l" to="/profile">Profile</router-link>
    </div>
 
    <router-view/>
    <h1>Free2Pay</h1>
    <h2>Best solution for sell</h2>

  </div>
</template>

<script>


export default {
  name: 'HomeView',
  methods:{
    home(){
      this.$router.push('/')
    }
  }

}
</script>
<style scoped>
img{
  transition: all 0.6s;
}
img:hover{
  filter: drop-shadow(5px 5px 5px #40b782);
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