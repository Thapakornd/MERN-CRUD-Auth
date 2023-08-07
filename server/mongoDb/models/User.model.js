import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String , required: true, unique: true},
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles: {
        Users: { type: Number, default: 2001},
        Editor: Number,
        Admin: Number,
    },
    AllProperties: [ {type: Schema.ObjectId, ref: 'Post'} ],
    refreshToken: { type: String}
})

const User = mongoose.model('User', userSchema);

export default User;