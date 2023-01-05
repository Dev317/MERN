import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({
            message: err.message,
        })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({
            message: err.message,
        })
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    let updatedPost = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID!');

    updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...updatedPost, _id }, { new: true} );

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
    let updatedPost = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID!');

    updatedPost = await PostMessage.findByIdAndRemove(_id);

    res.json({ message: 'Post deleted!' });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID!');

    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedPost);
}
