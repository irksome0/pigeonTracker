import mongoose from "mongoose";

export const connect = async () =>{
    if(mongoose.connections[0].readyState) return;

    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Connection established")
    }catch(error){
        throw new Error("Error connecting to DB")
    }
}