
const UserAuthor=require('../modals/userAuthorModel')

async function createUserOrAuthor(req,res){
    try{
    //business logic to create user or author
        //get user or author obj from req
        const newUserAuthor=req.body
        //find user by email id
        const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
        //if user or auhtor existed
        if(userInDb!=null){
            //check the roles
            if(newUserAuthor.role==userInDb.role){
                //if role is matched
                res.status(200).send({message:newUserAuthor.role,payload:userInDb})
            }else{
                //if role is not matched
                res.status(200).send({message:"Please choose a valid role to continue."})
            }
        }else{
            //creates a new user
            let newUser=new UserAuthor(newUserAuthor)
            let newUserOrAuthorDoc=await newUser.save()
            res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
        }
    }catch(error){
        if (error.code === 11000) {
            res.status(400).send({ message: "User with this email already exists. Please log in instead." });
        } else {
            res.status(500).send({ message: "Internal server error", error });
        }
    }
}
module.exports=createUserOrAuthor