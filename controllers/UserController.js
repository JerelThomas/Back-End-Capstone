const express = require('express')
const router = express.Router()

const supplierModel= require("../models/SupplierModel.js")


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







router.get("/shipment/get",async(req,res)=>
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

router.delete("/shipment/delete", async(req,res)=>
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






module.exports=router