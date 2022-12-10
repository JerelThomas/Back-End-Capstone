const express = require('express');
const jsonschema = require("jsonschema");//jsonschema 
const jwt  = require("jsonwebtoken");
const {BadRequestError} = require("../helpers/expressErrors.js");

const userAuthSchema = require("../schemas/userAuth.json");
const authModel = require("../models/authModel");

const router = express.Router();

router.post("/login",async(req,res)=>{

  //validate 
    const validator = jsonschema.validate(req.body, userAuthSchema);
    
    if (!validator.valid) {

      throw new BadRequestError();
    }
  
    const {email, password } = req.body;

    //authenticate
    const user = await authModel.authenticate(email, password);
    
    //creates my payload
        
    let payload = {
        id: user.user_id,
        username: user.username,
        email: user.email,
        phone_no : user.phone_number,
        location: user.location,
        isAuth : user.isAuth
      };
    
      console.log("payload",payload);
      //creates  token
    const token= jwt.sign(payload,process.env.SECRET_KEY);
  
    //return token
    return res.json({ token });

})

module.exports=router;