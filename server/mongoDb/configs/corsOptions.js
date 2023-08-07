import allowOrigins from "./allowsOrigin.js";

const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if(allowOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessState: 200
}

export default corsOptions;