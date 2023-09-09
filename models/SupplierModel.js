const db = require("../config/db.js");

class Supplier 
{

    static async createSupplier(supplier)
    {
        const results=await db.query(`INSERT INTO suppliers (Name, category, location) VALUES('${supplier.Name}','${supplier.category}','${supplier.location}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllSuppliers()
    {
        const results= await db.query("SELECT suppliers_id,Name, category, location FROM suppliers;");
  
        return results.rows; 
    }

    static async getSupplier(id)
    {

        const results=  await db.query(`SELECT suppliers_id,Name, category, location FROM suppliers WHERE suppliers_id = ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteSupplier(id)
    {
        await db.query(`DELETE FROM suppliers WHERE suppliers_id = ${id.item} `);
       
    }

    static async updateSupplier(user_form_data,id)
    {
      await db.query(
        `UPDATE suppliers SET Name ='${user_form_data.Name}',
        category='${user_form_data.category}',
        location ='${user_form_data.location}'
        WHERE suppliers_id = ${id} ;`)
    }
  





    static async createShipments(Shipment)
    {
        const results=await db.query(`INSERT INTO shipments (order_date , completed_delivery_date,suppliers_id,user_id) VALUES('${Shipment.order_date}','${Shipment.completed_delivery_date}','${Shipment.suppliers_id}','${Shipment.user_id}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllShipments()
    {
        const results= await db.query("SELECT * FROM shipments;");
  
        return results.rows; 
    }

    static async getShipment(id)
    {

        const results=  await db.query(`SELECT * FROM shipments WHERE shipments_id = ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteShipments(id)
    {
        await db.query(`DELETE FROM shipments WHERE shipments_id = ${id.item} `);
       
    }

    static async updateShipments(user_form_data,id)
    {
      await db.query(
        `UPDATE shipments SET order_date ='${user_form_data.order_date}',
        completed_delivery_date='${user_form_data.completed_delivery_date}',
        suppliers_id ='${user_form_data.suppliers_id}',
        user_id ='${user_form_data.user_id}'
        WHERE shipments_id = ${id} ;`)
    }
  





    static async createShipment_load(Shipment_loads)
    {
        const results=await db.query(`INSERT INTO shipments (quantity ,items_id,shipments_id) VALUES('${Shipment_loads.quantity}','${Shipment_loads.items_id}','${Shipment_loads.shipments_id}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllShipment_load()
    {
        const results= await db.query("SELECT * FROM Shipment_loads;");
  
        return results.rows; 
    }

    static async getShipment_load(id)
    {

        const results=  await db.query(`SELECT * FROM Shipment_loads WHERE shipment_load_id = ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteShipment_load(id)
    {
        await db.query(`DELETE FROM Shipment_loads WHERE shipment_load_id = ${id.item} `);
       
    }

    static async updateShipment_load(user_form_data,id)
    {
      await db.query(
        `UPDATE Shipment_loads SET quantity ='${user_form_data.quantity}',
        items_id='${user_form_data.items_id}',
        shipments_id ='${user_form_data.shipments_id}'
        WHERE shipment_load_id = ${id} ;`)
    }

}


module.exports = Supplier;