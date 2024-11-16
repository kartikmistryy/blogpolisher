import mongoose, {models, Schema} from "mongoose";

const postSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      prompt: {
        type: String,
        required: true,
      },
      generateResponse: {
        type: String,
        required: true,
      }
})

const Post = models.Post || mongoose.model('Post', postSchema)
export default Post;