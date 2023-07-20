const fs = require('fs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const readFile = require('../Utils/readFiles')
const userModel = require('../Model/user.model')

const login = (req,res) => { 
    const username = req.body.username 
    const userPassword = req.body.password

    const result = readFile('user.json')

    const checkExistUser = result.find(item => item.username == username)

    if(!checkExistUser){
        return res.status(404).json({message : "User not found"})
    }

    const checkPassword = bcrypt.compareSync(userPassword, checkExistUser.password)

    if(!checkPassword){
        return res.status(400).json({ message : "Wrong password Bitch"})
    }

    const token = jwt.sign({userId: checkExistUser.userId}, process.env.SECRET_KEY, {
        expiresIn: "1h"
    })

    const {password, ...returnUser} = checkExistUser

    return res.status(200).json({token, user: returnUser})
}

const getUser = (req,res) => {
    const data = fs.readFileSync('user.json')
    const result = readFile('user.json')

    return res.status(200).json({result})
}

const createUser = async (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const userPassword = req.body.password

    const salt = bcrypt.genSaltSync()
    const hash = bcrypt.hashSync(userPassword, salt)

    try{
        const user = await userModel.create({
            username: username,
            password: hash
        }).lean()

        const {password: userPass, ...returnUser} = user

        return res.status(200).json({message : "User created successful", user})

    } catch(error) {
        console.log(error)
        return res.status(500).json({message : "Error"})
    }
}

const deleteUser = (req, res) => {
    const deleteUser = req.params.id 

    const result = readFile('user.json')

    const newResult = result.filter(item => item.userId != deleteUser)

    const writeToFile = fs.writeFileSync('user.json', JSON.stringify(newResult))

    return res.status(200).json({ message: "Delete user success"})
}


module.exports = {
    login,
    createUser,
    getUser,
    deleteUser,
}