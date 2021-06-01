import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    FName: {type: String, require: true},
    LName: {type: String, require: true},
    userName: {type: String, require: true},
    email: {type: String, require: true},
    role: {type: String, require: true},
    password: {type: String, require: true},
    address : {type: String},
    country : {type: String},
    city : {type: String},
    postalCode : {type: String},
    aboutMe : {type: String},
})

const userDetail = mongoose.model('userDetail', userSchema);

export default userDetail