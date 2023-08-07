import User from "../models/User.model.js";
import jwt, { verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

// Register User
const createUser = async (req,res) => {
    try {
        const { email, user, pwd} = req.body;
        
        const emailExits = await User.findOne({ email: email }).exec();
        const userExits = await User.findOne({ username: user }).exec();
    
        // Check username or email already exits
        if (emailExits || userExits) return res.status(200).json({ message: 'Users or Email is already exits!'});
    
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        // Create and store new user
        const result = await User.create({
            email: email,
            username: user,
            password: hashedPwd,
        })
    
        console.log(result);
        res.status(200).json({ message: 'Create user successfully!'});
    } catch (error) {
        res.status(400).json({ message: 'Create user failed something went wrong!'});
    }
}

// Login
const authLogin = async (req, res) => {
    try {
        const { user, pwd} = req.body;
        
        const userExits = await (User.findOne({ username: user}) || User.findOne({ email: user})).exec();

        if (!userExits) return res.status(404); // Not found a user or email in database

        // Evaluate password
        const matchPwd = bcrypt.compare(pwd, userExits);

        if (matchPwd) {
            const roles = Object.values(userExits.roles).filter(Boolean);

            // Create JWT token
            const accessToken = jwt.sign(
                {
                    "UserInfo": {                        
                        'username': userExits.username,
                        'roles': roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '4h' }
            )

            const refreshToken = jwt.sign(
                {
                    'email': userExits.email,
                    'username': userExits.username
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            )

            // Saving refreshToken in database
            userExits.refreshToken = refreshToken;
            const result = await userExits.save();
            console.log(result);

            // Create cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000});
            res.status(200).json({ message: 'Login successfully', accessToken, roles });
        }
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong pls try again!'})
    }
}

// Logout
const loggedOut = async (req,res) => {
    try {
        const cookie = req.cookies;
        
        if (!cookie?.jwt) return res.status(204); // No content
        const refreshToken = cookie.jwt;

        // Is refreshToken in database?
        const foundUser = await User.findOne({ refreshToken: refreshToken}).exec();
        console.log(foundUser);

        if(!foundUser){
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
            return res.status(204); // No content;
        }

        // Also delete refreshToken in database
        foundUser.refreshToken = '';
        const result = await foundUser.save();
        console.log(result);

        // Clear jwt cookie in website
        res.clearCookie('jwt')
        res.status(204)
    } catch (error) {
        console.error.error;
        res.status(500);
    }
}

// Handle refresh token to take access token
const handleRefreshToken = async (req,res) => {
    try {
        const cookies = req.cookies;

        if (!cookies?.jwt) return res.status(401); // Unauthorized
        
        const refreshToken = cookies.jwt;

        const userExits = await User.findOne({ refreshToken: refreshToken}).exec();

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.username !== userExits.username) return res.status(403);
                
                const roles = Object.values(userExits.roles);
                const accessToken = jwt.sign(
                    {
                        'UserInfo': {
                            'username': decoded.username,
                            'roles': roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '4h' }
                )
                res.status(200).json({ roles, accessToken });
            }
        )
    } catch (error) {
        console.error.error;
        res.status(400);
    }
}

export {
    authLogin,
    handleRefreshToken,
    loggedOut,
    createUser
}