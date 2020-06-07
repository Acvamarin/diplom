const mongoose = require('mongoose')
const Schema = mongoose.Schema
const privatePaths = require('mongoose-private-paths')

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  happyBirthday: {
    type: String,
    required: true,
  },
  placeLes: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    private: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

user.plugin(privatePaths)

module.exports = mongoose.model('users', user)
