/**
• This will be the starting file of the project 
• */
const express = require("express")
const mongoose = require("mongoose")
const app = express()
// const sever_config = require("./config/sever.config")
const db_config = require("./config/db.config")
const user_model = require("./models/user.models")
const bcrypt = require("bcryptjs")
require('dotenv').config()
 
const PORT= process.env.PORT || 3005;

app.use(express.json())  //middleware

/**
 * Create an admin user at the starting of the application
 * if not already present
 * */
 
//  Connectin with mongodb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to the mongoDB");
})

db.once("open", ()=>{
   console.log("Connected to MongoDB");
   init()
})

async function init (){
  let user = await user_model.findOne({userID: "admin" })

  if (user) {
    console.log("Admin already peresent")
    return
  }

  try {
    user = await user_model.create({
      name : "Rohit Vishwakarma",
      userID :"admin",
      email: 'rohitvvishwakarma400@gmail.com',
      userType: "ADMIN",
      password: bcrypt.hashSync("Welcome1",8) 
  
    })
    console.log("Admin created",user);

  } catch (err) {
    console.log("Error while create admin",err);
  }
}

/**
 * Stich the route to the sever
 */
require("./router/auth.routes")(app)
require("./router/category.routes")(app)

/**
• Start the sever 
**/
 
 

app.listen(PORT, () =>{
  console.log("sever started at port num")
})

// app.listen(sever_config.PORT, () =>{
//   console.log("sever started at port num : ", sever_config.PORT)
// })