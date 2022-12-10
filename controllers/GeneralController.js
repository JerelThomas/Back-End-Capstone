const express = require('express')
const router = express.Router()
const jsonschema = require("jsonschema");

const adminSchema = require("../schemas/admin.json");
const userCreateSchema = require("../schemas/usercreation.json");
const {ensureAdmin,ensureCorrectUserOrAdmin,ensureLoggedIn} = require("../middleware/auth");
const adminUserCreateSchema = require("../schemas/adminUserRegister.json");
const userModel= require("../models/UserModel.js")
const itemModel= require("../models/ItemModel.js")
const supplierModel= require("../models/SupplierModel.js")
const category=require("../models/Category.js")
const {BadRequestError,NotFoundError} = require("../helpers/expressErrors.js");



router.get("/item",async(req,res)=>
{

    const CategoryIdValue= req.query.category_id;

    if(CategoryIdValue)
    {
        const listOfCategoryItems = await itemModel.getCategoryItem(CategoryIdValue);
        res.json({
            
            message : "A list ",
            data : listOfCategoryItems
        })
    }

    else
    {
        const item_data = await itemModel.getAllItem();

    res.json
    ({
        message:item_data
    })
    }

})


router.get("/itembestseller",async(req,res)=>
{

    const Best_SellerValue= req.query.best_seller;

    if(Best_SellerValue)
    {
        const listOfbest_sellerItems = await itemModel.getBestseller(Best_SellerValue);
        res.json({
            
            message : "A list ",
            data : listOfbest_sellerItems
        })
    }

})




router.get("/item/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await itemModel.getItem(id)

    if(!item)
{

    throw new NotFoundError(`User with id :${item} cannot be found`);
}
else 
{
    res.json
    ({
        item:item
    })
}  
})



router.post("/item",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await itemModel.createItem(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/item/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await itemModel.deleteItem(id)

    res.json
    ({
        item:item
    })
})

router.put("/item/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await itemModel.updateItem(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})








router.get("/",async(req,res)=>
{
    const users_data = await userModel.getAllUsers();

    res.json
    ({
        user_all:users_data
    })

})

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


router.delete("/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const user= await userModel.deleteUser(id)

    res.json
    ({
        user_all:user
    })
})

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






router.get("/AllShoppingitem/:id",async(req,res)=>
{
    const id=parseInt(req.params.id)

    const item_data = await itemModel.getAllShoppingCartItem(id);

    res.json
    ({
        message:item_data
    })

})

router.get("/Shoppingitem/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await itemModel.getShoppingCartItem(id)

    res.json
    ({
        item:item
    })
})

router.post("/Shoppingitem",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await itemModel.createShoppingCartItem(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/Shoppingitem/delete", async(req,res)=>
{
    const shopping_no= req.body;

    const item= await itemModel.deleteShoppingCartItem(shopping_no)

    res.json
    ({
        item:item
    })
})






router.get("/ItemSupplier/get",async(req,res)=>
{

    const item_data = await supplierModel.getAllItemSuppliers();

    res.json
    ({
        message:item_data
    })

})

router.get("/ItemSupplier/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await supplierModel.getItemSupplier(id)

    res.json
    ({
        item:item
    })
})

router.post("/ItemSupplier",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await supplierModel.createItemSupplier(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/ItemSupplier/delete", async(req,res)=>
{
    const supplier_data= req.body;

    const item= await supplierModel.deleteItemSupplier(supplier_data)

    res.json
    ({
        item:item
    })
})

router.put("/ItemSupplierupdate/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await supplierModel.updateItemSupplier(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})








router.get("/category/get",async(req,res)=>
{

    const item_data = await category.getAllcategory();

    res.json
    ({
        message:item_data
    })

})

router.get("/category/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await category.getcategory(id)

    res.json
    ({
        item:item
    })
})

router.post("/category",async(req,res)=>
{

   const item_data= req.body;

   const created_category= await category.createCategory(item_data)

   res.status(201).json({
    message: "A category was created!",
    data : created_category})

})

router.delete("/category/delete", async(req,res)=>
{
    const category_id= req.body;

    const item= await category.deleteItem(category_id)

    res.json
    ({
        item:item
    })
})

router.put("/categoryupdate/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const category_data= req.body;
    
    const item = await category.updatecategory(category_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})


module.exports=router