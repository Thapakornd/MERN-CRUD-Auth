import mongoose from "mongoose";

const connectDb = (url) => {
    try {
        mongoose.connect(url).then(() => {
            console.log('Connected to Mongo Database server!');
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDb;