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




/** GET /items  =>  { [item] }

 * Returns[{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }]

 * Authorization required: No

 */


router.get("/",async(req,res)=>
{

    {
        const item_data = await itemModel.getAllItem();

    res.json
    ({
        results:item_data,
        message :"A list of all message"
    })
    }

})



/** GET /items/Categoryid_for_item/:id  =>  { item }

 * Returns{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }

 * Authorization required: No

 */

router.get("/Categoryid_for_item/:id",async(req,res)=>
{

    const id=parseInt(req.params.id)

{
    const listOfCategoryItems = await itemModel.getCategoryItem(id);
    res.json({
        
        message : "A list ",
        result : listOfCategoryItems
    })
}

})

/** GET /items/itembestseller  =>  { item }

 * Returns{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }

 * Authorization required: No

 */

router.get("/itembestseller",async(req,res)=>
{

    const Best_SellerValue= req.query.best_seller;

    if(Best_SellerValue)
    {
        const listOfbest_sellerItems = await itemModel.getBestseller(Best_SellerValue);
        res.json({
            
            message : "A list ",
            result : listOfbest_sellerItems
        })
    }

})


/** GET /items/id  =>  { item }

 * Returns{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }

 * Authorization required: No

 */

router.get("/:id", async(req,res)=>
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
        result:item,
        message :`A detail description of item ${item.name}`
    })
}  
})


/** POST /items  =>  { item }

 * Returns{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }

 * Authorization required: No

 */

router.post("",async(req,res)=>
{


   

   const item_data= req.body;
   console.log("item_data=",item_data);

   const created_item= await itemModel.createItem(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

/** DELETE /items/:id  =>  { item }

 * Returns{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }

 * Authorization required: No

 */

router.delete("/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await itemModel.deleteItem(id)

    res.json
    ({
        item:item
    })
})

/** PUT /items/:id  =>  { item }

 * Returns{  stored_items_id, name,product_description,price,
              category_id, date_created, best_seller }

 * Authorization required: No

 */

router.put("/:id", async(req,res)=>
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






/** GET /items/category/title  =>  { item }

 * Returns{  category_id ,
			category_name,
			img_url }

 * Authorization required: No

 */
router.get("/category/title",async(req,res)=>
{

    const item_data = await category.getAllcategory();

    res.json
    ({
        message:item_data
    })

})

/** GET /items/category/:id  =>  { item }

 * Returns{  category_id ,
			category_name,
			img_url }

 * Authorization required: No

 */
router.get("/category/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await category.getcategory(id)

    res.json
    ({
        item:item
    })
})


/** POST /items/category  =>  { item }

 * Returns{  category_id ,
			category_name,
			img_url }

 * Authorization required: No

 */
router.post("/category",async(req,res)=>
{

   const item_data= req.body;

   const created_category= await category.createCategory(item_data)

   res.status(201).json({
    message: "A category was created!",
    data : created_category})

})


/** DELETE /items/category/delete =>  { item }

 * Returns{  category_id ,
			category_name,
			img_url }

 * Authorization required: No

 */
router.delete("/category/delete/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)

    const item= await category.deleteItem(id)

    res.json
    ({
        item:item
    })
})



/** PUT /items/categoryupdate/:id  =>  { item }

 * Returns{  category_id ,
			category_name,
			img_url }

 * Authorization required: No

 */
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