import mongoose from "mongoose";
//define schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    pic: { type: String ,required:true },
    address: { type:String, trim: true },
    about: { type: String, trim: true },
})

//define model
const userModel = mongoose.model("user",userSchema)



export default userModel