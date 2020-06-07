const mongoose = require('mongoose')
const Schema = mongoose.Schema

const post = new Schema({
  body: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  dislikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  comments: [
    {
      body: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      createdDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const commentsUser = 'user comments.user'

post.post('save', async (e) => {
  await e.populate(commentsUser).execPopulate()
})

function commentUser() {
  this.populate(commentsUser)
}

postSchema.pre('find', commentUser)
postSchema.pre('findOne', commentUser)
postSchema.pre('findOneAndUpdate', commentUser)

module.exports = mongoose.model('posts', post)
