import Post from "../../models/Post.model.js";
import User from "../../models/User.model.js";

// Get all post in database
const getAllPost = async (req,res) => {
    try {
        const data = await Post.find().exec();
        res.status(200).json(data);
    } catch (error) {
        console.error.error;
        res.status(400);
    }
};

// Create post in your database
const createPost = async (req,res) => {
    try {
        const { title, author, content } = req.body;

        const result = await Post.create({
            title: title,
            content: content,
            author: author
        })

        console.log(result);
        res.status(200).json({result, message: 'Create post successfully!'});
    } catch (error) {
        console.error.error;
        res.status(400);   
    }
}

// Get all post in current user
const getPostByCurrentUser = async (req,res) => {
    try {
        const cookies = req.cookies;
        
        if(!cookies?.jwt) return res.status(401); // Unauthorized

        const refreshToken = cookies.jwt;

        const userExits = await User.findOne({ refreshToken: refreshToken}).exec();

        const allPost = await Post.find({ author: userExits._id }).exec();
        
        console.log(allPost);

        res.status(200).json( allPost );
    } catch (error) {
        console.error.error;
        res.status(400).json({ message: 'Failed to fetch data to your interface!'})
    }
}

// Get post by ID
const getPostById = async (req,res) => {
    try {
        const { id } = req.params.id;

        const postExits = await Post.findById(id).exec();

        if(!postExits) return res.status(204).json({ message: 'Content not found!'});

        res.status(200).json(postExits);
    } catch (error) {
        console.error.error;
        res.status(400);
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

        console.log(result);

        res.status(200).json(result);
    } catch (error) {
        console.error.error;
        res.status(400);
    }
}

const delPostById = async (req,res) => {
    try {
        const { userId } = req.body;

        const userExits = await Post.findById( userId ).exec();

        if (!userExits) return res.status(204).json({ message: 'Not found post!'});

        const result = await Post.deleteOne({ username: userExits.username });

        console.log(result);

        res.status(200).json({ result, message: "Delete successfully!"});
    } catch (error) {
        console.error.error;
        res.status(400);
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