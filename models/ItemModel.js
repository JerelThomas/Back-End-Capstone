const db = require("../config/db.js");

class item
{

    static async createItem(item)
    {
        const results=await db.query(`INSERT INTO stored_items (name,product_description, price, category_id, quantity, best_seller) VALUES('${item.Name}','${item.product_description}','${item.price}','${item.category_id}','${item.quantity}','${item.best_seller}' ) RETURNING *`);
        return results.rows[0];
    }
    static async getAllItem()
    {
        const results= await db.query("SELECT stored_items_id,name,product_description, price, category_id, quantity,date_created,best_seller FROM stored_items;");
  
        return results.rows; 
    }

    static async getItem(id)
    {

        const results=  await db.query(`SELECT stored_items_id, name,product_description, price, category_id, quantity,date_created,best_seller FROM stored_items WHERE  stored_items_id= ${id}`);
        return results.rows[0];
         
    }

    static async getCategoryItem(value)
    {

        const results=  await db.query("SELECT * FROM stored_items WHERE category_id=$1",[value]);
        return results.rows;
         
    }

    static async getBestseller(value)
    {

        const results=  await db.query("SELECT * FROM stored_items WHERE best_seller=$1",[value]);
        return results.rows;
         
    }


    
    static async deleteItem(id)
    {
        await db.query(`DELETE FROM stored_items WHERE stored_items_id = ${id}`);
       
    }

    static async updateItem(user_form_data,id)
    {
      await db.query(
        `UPDATE stored_items SET Name ='${user_form_data.Name}',
        product_description ='${user_form_data.product_description}',
        price ='${user_form_data.price}',
        category_id='${user_form_data.category_id}' 
        quantity ='${user_form_data.quantity}',
        date_created='${user_form_data.date_created}',
        best_seller='${user_form_data.best_seller}'
        WHERE stored_items_id = ${id} ;`)
    }
  

    static async createShoppingCartItem(item)
    {
        const results=await db.query(`INSERT INTO shopping_cart_items (shopping_cart_no,stored_items_id) VALUES('${item.shopping_cart_no}','${item.stored_items_id}') RETURNING *`);
        return results.rows[0];
    }

    static async getAllShoppingCartItem(id)
    {
        const results= await db.query(`SELECT shopping_cart_no,stored_items_id FROM shopping_cart_items WHERE shopping_cart_no= ${id}`);
  
        return results.rows; 
    }

    static async getShoppingCartItem(id)
    {

        const results=  await db.query(`SELECT shopping_cart_no,stored_items_id FROM shopping_cart_items WHERE stored_items_id= ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteShoppingCartItem(id)
    {
        await db.query(`DELETE FROM shopping_cart_items WHERE stored_items_id = ${id.item} and shopping_cart_no = ${id.shopping_no}`);
    }






    
}

module.exports = item;