import jwt from 'jsonwebtoken'
import userModel from '../models/User.js'


const checkUserAuth = async(req,res,next)=>{
    let token 
    const {authorization } = req.headers
    console.log(req.headers)
    if(authorization && authorization.startsWith("Bearer")){
        try {

            // get token from header

            token = authorization.split(' ')[1]
console.log("Token",token)

          if(token !== undefined){
              //verify token 
              const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY)

              //get user from token 

              req.user = await userModel.findById(userID).select("-password")

              next()
          }

        } catch (error) {
            console.log(error)
            res.send({"status":"failed","message":"unauthorized user"})
            
        }
    } 
    if(!token){
        res.send({ "status": "failed", "message": "unauthorized user, No token" })
    }
}


export default checkUserAuth