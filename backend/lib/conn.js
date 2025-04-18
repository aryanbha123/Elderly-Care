import mongoose from 'mongoose'

export const connectDb = (URI) => {
    mongoose.connect(URI).then(()=>console.log("Connected to db")).catch(()=>console.log("Error"))
}