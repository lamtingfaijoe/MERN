import mongoose from 'mongoose';
import PostMessage from '../models/postMessages.js'



export const getPost = async (req,res) => {
    try{
        const postMessages =await PostMessage.find()
        console.log(postMessages)
        res.status(200).json(postMessages)
    }catch(error){
        res.status(404).json({message:error.message})
    }
    
}

export const createPost = async (req,res) =>{
    const post = req.body
    console.log(`Creating... ${post}`)
    const newPost = new PostMessage(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)

    }catch{
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async(req,res) => {
    const {id:_id} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true})
    res.json(updatedPost)
}
export const deletePost = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    await PostMessage.findByIdAndRemove(id)
    console.log('DELETE')
    res.json({message:'Post deleted sucessfully'})
}

export const likePost = async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')
    const post = await PostMessage.findById(id)
    const updatePost = await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount +1 },{new:true})
    res.json(updatePost)
}