const express = require('express')
const dbConfig = require('./config/database')
const {PORT} = require('./config/index')
const cors = require('./middlewares/cors')
const userController = require('./controllers/userController')  // adjust to project requirements
const itemController = require('./controllers/itemController')  // adjust to project requirements
const storage = require('./middlewares/storage')
const auth = require('./middlewares/auth')

start()

async function start(){
    const app = express()
    await dbConfig(app)
    app.use(cors())
    app.use(auth())
    app.use(storage())
    app.use(express.json())

    app.use('/users', userController) // adjust to project requirements
    app.use('/data/catalog', itemController) // adjust to project requirements

    app.listen(PORT, () => console.log(`REST Service is running on port ${PORT}`))
}
