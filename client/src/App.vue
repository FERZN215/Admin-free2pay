<template>
 <div>
  <router-view/>
 </div>
</template>
<script>
export default{
  methods:{
    home(){
      this.$router.push('/')
    }
  },
  data(){
    return{
      id:localStorage.id
    }
  }
}
</script>
<style>
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  
}

img{
  cursor: pointer;
  display: flex;
  float: left;
  width: 2%;
  height: 2%;
}nav{
 display: flex;
 
 margin-left: 48.2%;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}


</style>
