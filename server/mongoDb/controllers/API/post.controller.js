import Post from "../../models/Post.model.js";
import User from "../../models/User.model.js";

// Get all post in database
const getAllPost = async (req,res) => {
    try {
        const data = await Post.find().exec();
        return res.status(200).json(data);
    } catch (error) {
        console.error.error;
        return res.status(400);
    }
};

// Create post in your database
const createPost = async (req,res) => {
    try {
        const { title, author, content } = req.body;

        const userExits = await User.findOne({ username: author}).exec();

        if(!userExits) return res.status(204).send();

        const result = await Post.create({
            title: title,
            content: content,
            author: userExits._id
        })

        userExits.AllProperties.push(result._id);
        userExits.save();

        return res.status(200).json({result, message: 'Create post successfully!'});
    } catch (error) {
        console.error.error;
        return res.status(400);   
    }
}

// Get all post in current user
const getPostByCurrentUser = async (req,res) => {
    try {
        const cookies = req.cookies;

        if(!cookies?.jwt) return res.status(401).send(); // Unauthorized

        const refreshToken = cookies.jwt;

        const userExits = await User.findOne({ refreshToken: refreshToken}).exec();

        const allPost = await Post.find({ author: userExits._id }).exec();

        return res.status(200).json( allPost );
    } catch (error) {
        console.error.error;
        return res.status(400).json({ message: 'Failed to fetch data to your interface!'})
    }
}

// Get post by ID
const getPostById = async (req,res) => {
    try {
        const { id } = req.params;

        const postExits = await Post.findById(id).exec();

        if(!postExits) return res.status(404).send();

        return res.status(200).json(postExits);
    } catch (error) {
        console.error.error;
        return res.status(400);
    }
}

// Update post by Id 
const updatePostById = async (req,res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        const result = await Post.findByIdAndUpdate(id, {
            title: title,
            content: content
        })

        return res.status(200).json(result);
    } catch (error) {
        console.error.error;
        return res.status(400);
    }
}


// Delete post by id
const delPostById = async (req,res) => {
    try {
        const { id } = req.params;

        const postExits = await Post.findById(id).exec();

        if (!postExits) return res.status(404).send();
    
        // Delete from id
        const result = await Post.deleteOne({ _id: id });

        // Delete from user
        const user_id = postExits.author;
        const result_user = await User.updateOne({ _id: user_id}, {
            $pullAll: {
                AllProperties: [{_id: postExits._id}]
            }
        })

        return res.status(200).json({ result, message: "Delete successfully!"});
    } catch (error) {
        console.error.error;
        return res.status(400);
    }
};

export {
    getAllPost,
    delPostById,
    updatePostById,
    createPost,
    getPostById,
    getPostByCurrentUser
}