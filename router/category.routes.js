/**
 * POST localhost:8880/ecom/api/v1/auth/categories
 */
category_controller = require("../controller/category.controller")

module.exports = (app)=>{
    app.post("/ecom/api/v1/auth/categories",category_controller.createNewCategory)
}