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
        const results=await db.query(`INSERT INTO shipments (order_date , arrival_date,suppliers_id) VALUES('${Shipment.order_date}','${Shipment.arrival_date}','${Shipment.suppliers_id}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllShipments()
    {
        const results= await db.query("SELECT order_date , arrival_date,suppliers_id FROM shipments;");
  
        return results.rows; 
    }

    static async getShipments(id)
    {

        const results=  await db.query(`SELECT order_date , arrival_date,suppliers_id FROM shipments WHERE suppliers_id = ${id}`);
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
        arrival_date='${user_form_data.arrival_date}',
        suppliers_id ='${user_form_data.suppliers_id}'
        WHERE shipments_id = ${id} ;`)
    }









    static async createItemSupplier(id)
    {
        const results=await db.query(`INSERT INTO Supplied_items (suppliers_id ,stored_items_id) VALUES('${id.suppliers_id}','${id.stored_items_id}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllItemSuppliers()
    {
        const results= await db.query("SELECT suppliers_id ,stored_items_id FROM Supplied_items;");
  
        return results.rows; 
    }

    static async getItemSupplier(id)
    {

        const results=  await db.query(`SELECT suppliers_id ,stored_items_id FROM Supplied_items WHERE suppliers_id = ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteItemSupplier(id)
    {
        await db.query(`DELETE FROM Supplied_items WHERE suppliers_id = ${id.item} and stored_items_id = ${id.shopping_no}`);
       
    }

    static async updateItemSupplier(user_form_data,id)
    {
      await db.query(
        `UPDATE Supplied_items SET suppliers_id ='${user_form_data.suppliers_id}',
        stored_items_id='${user_form_data.stored_items_id}'
        WHERE suppliers_id = ${id} ;`)
    }
  
}

module.exports = Supplier;