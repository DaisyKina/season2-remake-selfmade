const express = require('express')
const app = express()
const port = 3001
const router = require('./Router/index_router')
const {connectToDB} = require('./MongoDB/database')
const cors = require('cors')
const morgan = require("morgan")

connectToDB()
app.use(router)
app.use(cors({
    origin: "*"
}))
app.use(morgan("combined"))
connectToDB()
app.listen(port, () => {
    console.log(`A string that you might want port http://localhost:${port}`)
})

