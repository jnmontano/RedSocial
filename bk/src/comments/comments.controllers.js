const uuid = require('uuid')

const Comments = require('../models/comments.models')
const Posts = require('../models/posts.models')
const Users = require('../models/users.models')

const findAllCommentsByPostId = async (postId) => {
    const comments = await Comments.findAll({
        where: {
            postId: postId
        },
        include: [
            {
                model: Posts
            },
            {
                model: Users
            }
        ]
    })
    return comments
}

const createComment = async (commentObj) => {
    const newComment = await Comments.create({
        id: uuid.v4(),
        content: commentObj.content,
        postId: commentObj.postId,
        userId: commentObj.userId
    })
    return newComment
}

createComment({
    content: "Mi primer comentario",
    postId: "a2470a60-f2c4-442c-a510-b818b2e151f6",
    userId: "13b4db9c-3f8d-49ed-b77d-b26743c42053"
})
    .then(data => console.log(data))
    .catch(err => console.log(err))



