const mongoose = require('mongoose')
const validator = require('validator')
// const mongoosePaginate = require('mongoose-paginate-v2')

const UserRoleSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,      
        userRole: {
            type: String,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model('User_Role', UserRoleSchema)
