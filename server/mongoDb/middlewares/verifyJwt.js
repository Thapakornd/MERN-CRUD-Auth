import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req, res, next) => {
    const authHeader = req?.headers['authorization'] || req?.headers['Authorization'];

    if (!authHeader) return res?.status(401);
    
    // Split for take jwt token in header authorization
    const token = authHeader.split(' ')[1];

    console.log(token);

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).send(); // Invalid token
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
    
            next();
        }
    )
}  

export default verifyJWT;