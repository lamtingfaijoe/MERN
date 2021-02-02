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

// export const updatePost = async(req,res) => {
//     const {id} = req.para
// }