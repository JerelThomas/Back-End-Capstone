const db = require("../config/db.js");
const bcrypt= require("bcryptjs");


class User 
{

    

    static async createUsers(user)
    {
    
        const salt = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(user.password,salt);
        

        const results= await db.query(`
        INSERT INTO users 
        (
            username,email,phone_number,password,location,first_name,last_name
        ) 
        VALUES($1,$2,$3,$4,$5,$6,$7) 
        RETURNING username,email,phone_number,password,location,first_name,last_name`,
        [
            user.username,
            user.email,
            user.phone_number,
            hashPassword,
            user.location,
            user.first_name,
            user.last_name
        ]);
        return results.rows[0];
    }

    static async createAdminUsers(user)
    {
    
        const salt = await bcrypt.genSalt(10); 
        const hashPassword = await bcrypt.hash(user.password,salt);


        const results= await db.query(`
        INSERT INTO users 
        (
            username,email,phone_number,password,location,isauth,first_name,last_name
        ) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) 
        RETURNING username,email,phone_number,password,location,isauth,first_name,last_name`,
        [
            user.username,
            user.email,
            user.phone_number,
            hashPassword,
            user.location,
            user.isauth,
            user.first_name,
            user.last_name
        ]);
        return results.rows[0];
    }

    static async getAllUsers()
    {
        const results= await db.query("SELECT * FROM Users;");
  
        return results.rows; 
    }

    static async getUser(id)
    {

        const results=  await db.query(`SELECT * FROM Users WHERE user_id = ${id}`);
        return results.rows[0];
         
    }

    static async getUserByEmail(email)
    {
        const results= await db.query(`
        SELECT 
       *
        FROM Users 
        WHERE email=$1`,
        [email]);
  
        return results.rows[0]; 
    }


    
    static async deleteUser(id)
    {
        await db.query(`DELETE FROM Users WHERE user_id = ${id}`);
       
    }

    static async updateUser(user_form_data,id)
    {
      await db.query(
        `UPDATE Users SET username ='${user_form_data.username}',
        email='${user_form_data.email}',
        location='${user_form_data.location}',
        phone_number='${user_form_data.phone_number}',
        IsAuth='${user_form_data.IsAuth}',
        location='${user_form_data.location}',
        first_name='${user_form_data.first_name}',
        last_name='${user_form_data.last_name}'
        WHERE user_id = ${id} ;`)
    }
  
}

module.exports = User;