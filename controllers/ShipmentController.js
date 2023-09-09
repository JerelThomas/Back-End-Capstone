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

/*HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */


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





router.get("/Supplier/get",async(req,res)=>
{

    const item_data = await supplierModel.getAllSuppliers();

    res.json
    ({
        message:item_data
    })

})

router.get("/Supplier/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await supplierModel.getSupplier(id)

    res.json
    ({
        item:item
    })
})

router.post("/Supplier",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await supplierModel.createSupplier(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/Supplier/delete", async(req,res)=>
{
    const supplier_data= req.body;

    const item= await supplierModel.deleteSupplier(supplier_data)

    res.json
    ({
        item:item
    })
})

router.put("/Supplierupdate/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await supplierModel.updateSupplier(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})







router.get("/shipment/all",async(req,res)=>
{

    const item_data = await supplierModel.getAllShipments();

    res.json
    ({
        message:item_data
    })

})

router.get("/shipment/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await supplierModel.getShipments(id)

    res.json
    ({
        item:item
    })
})

router.post("/shipment",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await supplierModel.createShipments(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/shipment", async(req,res)=>
{
    const supplier_data= req.body;

    const item= await supplierModel.deleteShipments(supplier_data)

    res.json
    ({
        item:item
    })
})

router.put("/shipmentupdate/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await supplierModel.updateShipments(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})





router.get("/shipmentload",async(req,res)=>
{

    const item_data = await supplierModel.getAllShipment_load();

    res.json
    ({
        message:item_data
    })

})

router.get("/shipmentload/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    
    const item= await supplierModel.getShipment_load(id)

    res.json
    ({
        item:item
    })
})

router.post("/shipmentload",async(req,res)=>
{

   const item_data= req.body;

   const created_item= await supplierModel.createShipment_load(item_data)

   res.status(201).json({
    message: "A user was created!",
    data : created_item})

})

router.delete("/shipmentload", async(req,res)=>
{
    const supplier_data= req.body;

    const item= await supplierModel.deleteShipment_load(supplier_data)

    res.json
    ({
        item:item
    })
})

router.put("/shipmentloadupdate/:id", async(req,res)=>
{
    const id=parseInt(req.params.id)
    const item_data= req.body;
    
    const item = await supplierModel.updateShipment_load(item_data,id)

    res.json
    ({
        item:item,
        text:`${id} has been updated`
    })
})


module.exports=router