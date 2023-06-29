import axios from 'axios'
export default ()=>{
    return axios.create({
        baseURL:"http://localhost:5001/"
        // baseURL:'http://62.217.178.101:5000'
    })
}