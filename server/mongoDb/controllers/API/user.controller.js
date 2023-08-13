import User from "../../models/User.model.js";

// Get all user 
const getAllUser = async (req,res) => {
    try {
        const data = await User.find().exec();

        res.status(200).json(data);
    } catch (error) {
        console.error.error;
        res.sendStatus(400);
    }
};

// Get user by Id
const getById = async (req,res) => {
    try {  
        const id = req.params.id;

        const data = await User.findById(id).exec();
        if(!data) return res.status(404).json({ message: "User not found!"});

        res.status(200).json(data);
    } catch (err) {
        console.error.err;
        res.status(404);
    }
};

// Delete by user id
const delById = async (req,res) => {
    try {
        const id = req.params.id;
        
        const data = await User.findById( id ).exec();
        if (!data) return res.status(404).json({ message: "User not found!"});
    
        const result = await User.deleteOne({ username: data.username });

        res.status(204).json({message: 'Delete successfully!'});
    } catch (error) {
        console.error.error;
        res.status(400);
    }
};

// Update user by ID
const updateById = async (req,res) => {
    try {
        const { id } = req.params; 
        const { roles } = req.body;

        const userExits = await User.findOne({ _id: id}).exec();

        if (!userExits) return res.status(404).json({ message: "User not found!"}).send();

        // Updating information for Editor or Admin roles
        userExits.roles.Users = roles;
        const result = await userExits.save();

        res.status(200).json({ result , msg: "Update successfully!"})
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