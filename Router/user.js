const { login, getUser, createUser, deleteUser } = require('../Controller/user')
const authentication = require('../Middleware/Authentication')

const router = require('express').Router()

router.post('/login', login)
router.get('/', authentication,getUser)
router.post('/', createUser)
router.delete('/:id', authentication, deleteUser)

module.exports = router