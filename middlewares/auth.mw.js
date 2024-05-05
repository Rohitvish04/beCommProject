const user_model = require("../models/user.models")

/**
 * Create e mw will check if the request body is prpoer and correct
 *  */ 

const verifySignUpBody = async  (req, res, next)=>{
    try {

        //Check the name
        if(!req.body.name){
           return  res.status(400).send({message : "Failed ! Name was not provied in request body"})
        }

        //check for the email
        if(!req.body.email){
            return  res.status(400).send({message : "Failed ! Email was not provied in request body"})
         }
        //check for the userID
        if(!req.body.userID){
            return  res.status(400).send({message : "Failed ! userID was not provied in request body"})
         }

        //check if the user with same userID is already present
         const user = await user_model.findOne({userID : req.body.userID})

        if(user){
            return  res.status(400).send({message : "Failed ! user with same userID is already present"})
        }
        next()

    } catch(err) {
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message : "Error while validating the request body"
        })
    }
}
const verifySignInBody = async (req, res, next)=>{

    if(!req.body.userID){
        return res.status(400).send({
            message : "userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message : "password is not provided"
        })
    }
    next()
}

module.exports ={
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
}