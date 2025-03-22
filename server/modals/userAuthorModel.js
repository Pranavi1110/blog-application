const mongoose=require('mongoose')

//define user/author schema
const userAuthorSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl:{
        type:String,
    },
    isActive:{
        type:String,
        default:"Active"
    },
    isBlocked:{
        type:Boolean,
        default:false
    }
},{"strict":"throw"})

//create modal for userAuthorSchema
const UserAuthor=mongoose.model('userauthor',userAuthorSchema)

//export

module.exports=UserAuthor