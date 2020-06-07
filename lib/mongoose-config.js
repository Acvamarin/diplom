const mongoose = require('mongoose')

const config = require('./config')

module.exports = () => {
  mongoose
    .connect(config.mongoUri, { useNewUrlParser: true })
    .then((() => console.log('Подключилась к MongoDB')))
    .catch((mistake) => console.log(mistake))
}
