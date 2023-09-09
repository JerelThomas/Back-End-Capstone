const db = require("../config/db.js");

class Orders
{

    static async createOrder(info)
    {
        const results=await db.query(`INSERT INTO orders (payment_type,is_ordered,user_id) VALUES('${info.payment_type}','${info.is_ordered}','${info.user_id}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllOrders()
    {
        const results= await db.query("SELECT * FROM orders;");
  
        return results.rows; 
    }

    static async getOrder(id)
    {

        const results=  await db.query(`SELECT * FROM orders WHERE orders_id= ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteOrder(id)
    {
        await db.query(`DELETE FROM orders WHERE orders_id = ${id}`);
       
    }

    static async updateOrders(user_form_data,id)
    {
      await db.query(
        `UPDATE orders SET payment_type ='${user_form_data.payment_type}',
        is_ordered ='${user_form_data.is_ordered}',
        user_id ='${user_form_data.user_id}'
        WHERE category_id = ${id} ;`)
    }
    




    static async createOrdered_items(info)
    {
        const results=await db.query(`INSERT INTO Ordered_items (ordered_items_id,orders_id,items_id) VALUES('${info.ordered_items_id}','${info.orders_id}','${info.items_id}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllOrdered_items()
    {
        const results= await db.query("SELECT * FROM Ordered_items;");
  
        return results.rows; 
    }

    static async getOrdered_item(id)
    {

        const results=  await db.query(`SELECT * FROM Ordered_items WHERE ordered_items_id= ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteOrdered_items(id)
    {
        await db.query(`DELETE FROM Ordered_items WHERE ordered_items_id = ${id}`);
       
    }

    static async updateOrdered_items(user_form_data,id)
    {
      await db.query(
        `UPDATE Ordered_items SET orders_id ='${user_form_data.orders_id}',
        items_id ='${user_form_data.items_id}',
        WHERE ordered_items_id = ${id} ;`)
    }
}

module.exports = Orders;