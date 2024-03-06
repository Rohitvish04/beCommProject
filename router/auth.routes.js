/**
 * POST localhost:8888/ecom/auth/signup
 * 
 * I need to intercept this
 */
const authController = require("../controller/auth.controller")

module.exports = (app)=>{
    app.post("/ecom/api/v1/auth/signup",authController.signup)
}