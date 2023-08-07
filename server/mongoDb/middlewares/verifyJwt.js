import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401);

    // Split for take jwt token in header authorization
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403); // Invalid token
            req.user = decoded.username;
            req.email = decoded.email;
            next();
        }
    )
}  

export default verifyJWT;