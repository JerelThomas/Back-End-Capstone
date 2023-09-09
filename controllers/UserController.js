const express = require('express')
const router = express.Router()
const jsonschema = require("jsonschema");

const adminSchema = require("../schemas/admin.json");
const userCreateSchema = require("../schemas/usercreation.json");
const {ensureAdmin,ensureCorrectUserOrAdmin,ensureLoggedIn} = require("../middleware/auth");
const adminUserCreateSchema = require("../schemas/adminUserRegister.json");
const userModel= require("../models/UserModel.js")
const itemModel= require("../models/ItemModel.js")
const category=require("../models/Category.js")
const {BadRequestError,NotFoundError} = require("../helpers/expressErrors.js");


/** GET /users/ =>  { user }

 * Returns{  "user_id",
			"username",
			"email",
			"phone_number",
			"password" ,
			"isauth",
			"location",
			"shopping_cart_no"}

 * Authorization required: No

 */

router.get("/",async(req,res)=>
{
    const users_data = await userModel.getAllUsers();

    res.json
    ({
        user_all:users_data
    })

})


/** GET /users/:id =>  { user }

 * Returns{  "user_id",
			"username",
			"email",
			"phone_number",
			"password" ,
			"isauth",
			"location",
			"shopping_cart_no"}

 * Authorization required: No

 */
router.get("/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const user= await userModel.getUser(id)

    if(!user)
{

    throw new NotFoundError(`User with id :${id} cannot be found`);
}
else 
{
    res.json
    ({
        User:user
    })
}  
})

/** POST /users/ =>  { user }

 * Returns{  "user_id",
			"username",
			"email",
			"phone_number",
			"password" ,
			"isauth",
			"location",
			"shopping_cart_no"}

 * Authorization required: No

 */
router.post("/",async(req,res)=>
{

   const user_data= req.body;

   const validator = jsonschema.validate(req.body, userCreateSchema);

   if (!validator.valid) 
   {
       throw new BadRequestError();
   }

   const foundUser = await userModel.getUserByEmail(user_data.email);

   if(foundUser)
   {
   
      throw new BadRequestError({"email":`Sorry the email ${req.body.email} already exists`});
   }

   const user = await userModel.createUsers(user_data) 
   res.status(201).json({
       message: "A User was created!",
       data : user 
   })

})


/** GET /users/admin =>  { user }

 * Returns{  "user_id",
			"username",
			"email",
			"phone_number",
			"password" ,
			"isauth",
			"location",
			"shopping_cart_no"}

 * Authorization required: Yes

 */
router.post("/admin",ensureAdmin,async(req,res)=>{

    const userData = req.body;

    const validator = jsonschema.validate(req.body, adminSchema);

    if (!validator.valid) 
    {

        throw new BadRequestError();

    }

    //Check to see if the title already exists
    const foundUser = await userModel.getUserByEmail(userData.email);

    if(foundUser)
    {
    
       throw new BadRequestError({email:`Sorry the email ${req.body.email} already exists`});
    }

    const user = await userModel.createAdminUsers(userData) // create

    console.log("User",user)
    res.status(201).json({
        message: "An Admin User was created!",
        data : user 
    })

})

/** DELETE /users/:id =>  { user }

 * Returns{  "user_id",
			"username",
			"email",
			"phone_number",
			"password" ,
			"isauth",
			"location",
			"shopping_cart_no"}

 * Authorization required: No

 */
router.delete("/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const user= await userModel.deleteUser(id)

    res.json
    ({
        user_all:user
    })
})


/** PUT /users/:id =>  { user }

 * Returns{  "user_id",
			"username",
			"email",
			"phone_number",
			"password" ,
			"isauth",
			"location",
			"shopping_cart_no"}

 * Authorization required: No

 */
router.put("/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const user_data= req.body;
    
    const user= await userModel.updateUser(user_data,id)

    res.json
    ({
        user_all:user,
        text:`${id} has been updated`
    })
})


module.exports=router