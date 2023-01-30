
import axios from 'axios';

const loginform =async ( ) => {
     try {
              const option = {
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                      {
                          email: `${email}`,
                          password: `${password}`,
                      }
                  )
              }
              await fetch('http://192.168.125.7:8000/api/user/login', option)
                  .then(res => res.json())
                  .then(d =>{
                    setdata(d)
                    if (d.status === "success") {
                         storeToken(d.token)  // store token in storage 
                         clearTextInput()
                        navigation.navigate("SalonAppDrawer")
                    } 
                    else(data.status === "failed")
                    {
                        Toast.show({
                            type: 'warning',
                            position: 'top',
                            topOffset: 0,
                            text1: d.message
                        })
                    }
                })
                  .catch(err => console.log(err))
                  
              
          } catch (error) {
              console.log(error)
          }
         

    
}


export default {loginform}