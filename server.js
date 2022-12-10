const express = require("express")
const cors = require("cors");
const {authenticateJWT} = require("./middleware/auth");
const {NotFoundError} = require("./helpers/expressErrors.js");
require("dotenv").config();

const generalController=require("./controllers/GeneralController.js");
const userController=require("./controllers/UserController.js");
const authController = require("./controllers/AuthController");


const app = express();
app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cors());

app.use(authenticateJWT);

app.use("/api/auth",authController);
app.use("/api/user", generalController);
app.use("/api", userController);

app.use(function (req, res, next) {
  throw new NotFoundError();
});


app.use(function (err, req, res, next) {

    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
  });

const PORT=3000;
app.listen(PORT, ()=>
{
console.log(`web server is up and running on port ${PORT}`)
})
