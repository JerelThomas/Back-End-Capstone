const db = require("../config/db.js");

class category
{

    static async createCategory(info)
    {
        const results=await db.query(`INSERT INTO categories (category_name,img_url) VALUES('${info.category_name}','${info.img_url}') RETURNING *`);
        return results.rows[0];
    }
    static async getAllcategory()
    {
        const results= await db.query("SELECT category_id,category_name,img_url FROM categories;");
  
        return results.rows; 
    }

    static async getcategory(id)
    {

        const results=  await db.query(`SELECT category_id,category_name,img_url FROM categories WHERE category_id= ${id}`);
        return results.rows[0];
         
    }

    
    static async deleteItem(id)
    {
        await db.query(`DELETE FROM categories WHERE category_id = ${id}`);
       
    }

    static async updatecategory(user_form_data,id)
    {
      await db.query(
        `UPDATE categories SET category_name ='${user_form_data.category_name}',
        img_url ='${user_form_data.img_url}',
        WHERE category_id = ${id} ;`)
    }
    
}

module.exports = category;