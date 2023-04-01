






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