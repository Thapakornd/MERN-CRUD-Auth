import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './mongoDb/connectDb.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());

app.use(cookieParser());

// Connect to database (MongoDB)
const startServer = () => {
    try {
        connectDb(process.env.ATLAS_URL).then(() => {
            app.listen(PORT, () => {
                console.log(`Connected to server at port ${PORT}`);
            })
        });
        
    } catch (error) {
        console.log(error);
    }
}

startServer();