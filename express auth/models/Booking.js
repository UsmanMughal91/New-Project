import mongoose from "mongoose";



//define schema
const BookingSchema = new mongoose.Schema({
    expertID: { type: String, required: true, trim: true },
    userid: { type: String, required: true, trim: true },
    user: 
        {
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        pic: { type: String, trim: true }

    },
    expert: 
        {
        _id: { type: String, required: true, trim: true },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        parlourName: { type: String, required: true, trim: true },
        pic: { type: String, trim: true },  
        address: { type:String, trim: true },
        phone: { type:String, trim: true },
        about: { type: String, trim: true },

    },
    service: 
    {
        id: {type: String,required: true, trim: true},
        serviceName: { type: String, required: true, trim: true },
        servicePrice: { type: String,  trim: true,required:true },
        serviceDetails: { type: String,  trim: true },
        pic: { type: String, trim: true }
    },
    date: { type: String,  trim: true,required:true },
    time: { type: String, trim: true },
    method: { type: String, trim: true },
    status: { type: String, trim: true },
})



//define model
const BookingModel = mongoose.model("Bookings", BookingSchema)


export default BookingModel;