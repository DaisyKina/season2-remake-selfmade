const readFile = require('../Utils/readFiles')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const bearerToken = req.headers.authorization

        if(!bearerToken){ 
            return res.status(404).json({message : 'Where is the token whore?'})
        }
    const token = bearerToken.split('')[1]
        try{
            const verifyToken = jwt.verify(token, process.env.SERCRET_KEY )
            if(verifyToken){
                next()
            }
        } catch {
            return res.status(400).json({message: "Wrong token arshole"})
        }
    const result = readFile('user.json')
    const userId = req.body.id
    const checkUser = result.find(item => item.userId == userId)

    if(checkUser){
        next()
    }

    return res.status(404).json({ message : 'No you have not sign in'})
}
module.exports = authentication