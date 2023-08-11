import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDb from './mongoDb/connectDb.js';
import * as dotenv from 'dotenv';
import credential from './mongoDb/middlewares/credentials.js';
import corsOptions from './mongoDb/configs/corsOptions.js';

dotenv.config();

const app = express();
const PORT = 8000;

// Handle options credentials check - before CORS! and fetch cookie
app.use(credential);

// Handle cross origin resource
app.use(cors(corsOptions));

// Middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }))

// Middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Routing API 
import userRouter from './mongoDb/routes/users.route.js';
import authRouter from './mongoDb/routes/auth.route.js';
import postRouter from './mongoDb/routes/posts.route.js';
import verifyJWT from './mongoDb/middlewares/verifyJwt.js';

app.use(authRouter);

// verify JWT
app.use(verifyJWT);
app.use('/users', userRouter);
app.use('/posts', postRouter);

// Connect to database (MongoDB)
const startServer = async () => {
    try {
        connectDb(process.env.ATLAS_URL);        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
        
    } catch (error) {
        console.log(error);
    }
}

startServer();