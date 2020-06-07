require('dotenv').config()

const app = require('./app')
const config = require('./lib/config')

app(() => console.log(`Старт сервера${config.port}`))
