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
const Order=require("../models/Order.js")
const {BadRequestError,NotFoundError} = require("../helpers/expressErrors.js");



router.get("/Orders",async(req,res)=>
{

    const item_data = await Order.getAllOrders();

    res.json
    ({
        message:item_data
    })

})

router.get("/Order/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await Order.getOrder(id)

    res.json
    ({
        item:item
    })
})

router.post("/Order",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await Order.createOrder(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/Order", async(req,res)=>
{
    const supplier_data= req.body;

    const item= await Order.deleteOrder(supplier_data)

    res.json
    ({
        item:item
    })
})

router.put("/Order/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await Order.updateOrders(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})






router.get("/Ordered_items",async(req,res)=>
{

    const item_data = await Order.getAllOrdered_items();

    res.json
    ({
        message:item_data
    })

})

router.get("/Ordered_item/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await Order.getOrdered_item(id)

    res.json
    ({
        item:item
    })
})

router.post("/Ordered_item",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await Order.createOrdered_items(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/Ordered_item", async(req,res)=>
{
    const supplier_data= req.body;

    const item= await Order.deleteOrdered_items(supplier_data)

    res.json
    ({
        item:item
    })
})

router.put("/Ordered_item/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await Order.updateOrdered_items(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})




module.exports=router