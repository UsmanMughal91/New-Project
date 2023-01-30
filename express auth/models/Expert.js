import mongoose from "mongoose";
//define schema
const ExpertSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    parlourName: { type: String, trim: true, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    pic: { type: String, required: true },
    address: { type: String, trim: true },
    about: { type: String, trim: true },
    daysX: { type: String, trim: true },
    daysY: { type: String, trim: true },
    daysZ: { type: String, trim: true },
    timeX: { type: String, trim: true },
    timeY: { type: String, trim: true },
    timeZ: { type: String, trim: true },
    otp: { type: String, trim: true },
})



//define model
const ExpertModel = mongoose.model("Expert", ExpertSchema)



export default ExpertModel