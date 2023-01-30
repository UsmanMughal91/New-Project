import mongoose from "mongoose";
//define schema
const ServiceSchema = new mongoose.Schema({
    id: {type: String,required: true, trim: true},
    serviceName: { type: String, required: true, trim: true },
    servicePrice: { type: String,  trim: true,required:true },
    serviceDetails: { type: String,  trim: true,required:true },
    pic: { type: String, trim: true },
})



//define model
const ServiceModel = mongoose.model("Services", ServiceSchema)



export default ServiceModel;