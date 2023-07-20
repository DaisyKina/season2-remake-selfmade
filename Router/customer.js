const { login, getCustomer, createCustomer, deleteCustomer } = require('../Controller/customer')
const authentication = require('../Middleware/Authentication')

const router = require('express').Router()

router.post('/login', authentication, login)
router.get('/', getCustomer)
router.put('/',authentication, createCustomer)
router.delete('/:id', authentication, deleteCustomer)

module.exports = router