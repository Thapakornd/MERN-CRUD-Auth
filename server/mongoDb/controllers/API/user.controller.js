import User from "../../models/User.model.js";

const getAllUser = async (req,res) => {
    try {
        const data = await User.find().exec();
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error.error;
        res.sendStatus(400);
    }
};

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

const delById = async (req,res) => {
    try {
        const id = req.params.id;
        
        const data = await User.findById( id ).exec();
        if (!data) return res.status(404).json({ message: "User not found!"});
    
        const result = await User.deleteOne({ username: data.username });
        console.log(result);

        res.status(204).json({message: 'Delete successfully!'});
    } catch (error) {
        console.error.error;
        res.status(400);
    }
};

const updateById = async (req,res) => {
    try {
        const { user , roles, allProperties, id } = req.body;

        const userExits = await User.findOne({ _id: id}).exec();

        if (!userExits) return res.status(404).json({ message: "User not found!"});

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