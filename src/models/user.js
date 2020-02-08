const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema(
  {   
    userName: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true
      },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      select: false
    }, 
    address: {
        type: String,
        required: true
      },
    phone: {
      type: String
    },
    userRole : {type: mongoose.Schema.Types.ObjectId, ref: 'User_Role'},
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema)
