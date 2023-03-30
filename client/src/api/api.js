import axios from 'axios'
export default ()=>{
    return axios.create({
        baseURL:"http://localhost:5000/"
        // baseURL:'http://62.217.178.101:5000'
    })
}