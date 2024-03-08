/** 
 * I need to write the controller / logic to register a user 
 * */
const bcrypt = require("bcryptjs")
const user_model = require("../models/user.models")
const jwt = require("jsonwebtoken")
const secret = require("../config/auth.config")
exports.signup = async (req, res) =>{
    /**
     * Logic to create the user
     */

    //1. Read the request body
    const request_body = req.body

    //2. Insert the data in the Users collection in MongoDB
    const userObj = {
        name : request_body.name,
        userID : request_body.userID,
        email : request_body.email,
        userType : request_body.userType,
        password : bcrypt.hashSync(request_body.password, 8)
    }

    try {
      const user_created = await user_model.create(userObj)
      /**
       * Return this user
       */
        const res_Obj = {
            name : user_created.name,
            userID : user_created.userID,
            email : user_created.email,
            userType : user_created.userType,
            createdAt : user_created.createdAt,
            updatedAt : user_created.updatedAt,
        }

      res.status(201).send(res_Obj)
    } catch (err) {
        console.log("Error while registering the user",err);
        res.status(500).send({
            message : "Some error happened while registering the user"
        }) //intternal sever

    }


    //3. Return the response back to the user
}

exports.signin = async (req, res) =>{

    //Check if the user id is present in the sysyem
    const user = await user_model.findOne({userID : req.body.userID})

    if(user == null){
        return res.status(400).send({
            message : "User id passed is not a valid user id"
        })
    }

    //Password is correct
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
    if(!isPasswordValid){
        return res.status(401).send({
            message : "Wrong password passed"
        })
    }

    //using jwt we will create the access token with a given TTL and return
    const token = jwt.sign({id : user.userID}, secret.secret,{
        expiresIn : 120
    })
     

    res.status(200).send({
        name : user.name,
        userID : user.userID,
        email : user.email,
        password : user.password,
        userType : user.userType,
        accessToken : token

    })

}


