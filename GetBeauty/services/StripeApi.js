
import axios from 'axios';

const createPaymentIntent = (data) =>{
    return new Promise((resolve,reject)=>{
        axios.post("http://192.168.46.7:8000/api/user/payment",data).then(function(res){
            resolve(res)
        }).catch(function(error){
            reject(error)
        })
    })
}


export default createPaymentIntent