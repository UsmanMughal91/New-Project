    import mongoose from "mongoose";

    const connectdb = async (DATABASE_URL)=>{
        try {
            const DB_OPTIONS = {
                    dbName:'GetBeauty'
            }
            await mongoose.connect(DATABASE_URL,DB_OPTIONS)
            console.log('connection successfully')
        } catch (error) {
            console.log(error)
        }
    }


    export default connectdb