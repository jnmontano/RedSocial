const userControllers = require('./users.controllers')
const { host } = require('../../config')
//! const { findAllUsers, findUserById, createUser, updateUser } = require('./users.controllers')

const getAllUsers = (req, res) => {

    //TODO Agregar el limit y el offset desde los queries para manejar la paginacion, y generar url's dinamicas

    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 10

    userControllers.findAllUsers(limit, offset)
        .then((data) => {
            const nextPageUrl = (data.count - offset) > limit ? `${host}/api/v1/users?limit=${limit}&offset=${offset + limit}`: null;
            const prevPageUrl = (offset - limit) >= 0 ? `${host}/api/v1/users?limit=${limit}&offset=${offset - limit}`: null;

            res.status(200).json({
                count: data.count,
                next: nextPageUrl,
                prev: prevPageUrl,
                results: data.rows
            })
        })
        .catch((err) => {
            res.status(400).json({message: 'Bad request', err})
        })
}

const getUserById = (req, res) => {
    const id = req.params.id
    userControllers.findUserById(id)
        .then(data => {
            //? En caso de que data no exista (el usuario no exista)
            if(!data){
                return res.status(404).json({message: `User with id: ${id}, not found`})
            }
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
}

const postNewUser = (req, res) => {
    const userObj = req.body
    userControllers.createUser(userObj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err: err.message})
        })
}

const patchUser = (req, res) => {

    const id = req.params.id
    const userObj = req.body 

    userControllers.updateUser(id, userObj)
        .then(data => {
            if(!data) {
                return res.status(404).json({message: 'Invalid ID'})
            }
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
}

const deleteUser = (req, res) => {
    const id = req.params.id 
    userControllers.deleteUser(id)
        .then(data => {
            if(!data) {
                return res.status(404).json({message: 'Invalid ID'})
            }
            res.status(204).json()
        })
        .catch(err => {
            res.status(400).json({message: 'Bad request', err})
        })
}

const getMyUser = (req, res) => {
    const user = req.user
    res.status(200).json(user)
}



module.exports = {
    getAllUsers,
    getUserById,
    getMyUser,
    postNewUser,
    patchUser,
    deleteUser
}