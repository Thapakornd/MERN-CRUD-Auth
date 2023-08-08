import User from "../../models/User.model.js";

const getAllUser = async (req,res) => {
    try {
        const data = await User.find().exec();
        console.log(data);
        res.json(data);
    } catch (error) {
        console.error.error;
        res.status(400);
    }
};

const getById = async (req,res) => {
    try {
        const { user } = req.body;
        
        const data = await User.findOne({ username: user}).exec();
        if (!data) return res.status(204).json({ message: "User not found!"});
    
        console.log(data);

        res.status(200).json(data);
    } catch (err) {
        console.error.err;
        res.status(404);
    }
};

const delById = async (req,res) => {
    try {
        const { user } = req.body;
        
        const data = await User.findOne({ username: user}).exec();
        if (!data) return res.status(204).json({ message: "User not found!"});
    
        const result = await User.deleteOne({ username: user });
        console.log(result);

        res.status(204).json({message: 'Delete successfully!'});
    } catch (error) {
        console.error.error;
        res.status(400);
    }
};

const updateById = async (req,res) => {
    try {
        const { user , email, roles, allProperties, id } = req.body;

        const userExits = await User.findOne({ _id: id}).exec();

        if (!userExits) return res.status(204).json({ message: "User not found!"});

        // Updating information for Editor or Admin roles
        userExits.username = user;
        userExits.roles = roles;
        userExits.AllProperties = allProperties;
        const result = await userExits.save();
        console.log(result);

        res.status(200).json({ result })
    } catch (error) {
        console.error.error;
        res.status(400);
    }
};

export {
    getAllUser,
    getById,
    delById,
    updateById
}