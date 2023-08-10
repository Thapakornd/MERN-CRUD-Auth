import allowOrigins from "../configs/allowsOrigin.js";

const credentials = (req, res, next) => {
    const origin = req?.headers.origin;
    if (allowOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
} 

export default credentials;