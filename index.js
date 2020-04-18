require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const config=require("config");
const mongoURI = config.get("DB");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();


//Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const blogRoutes = require('./routes/blog');


//Middlewares
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

//Routes Middlewares
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", blogRoutes)




mongoose.connect(mongoURI || "mongodb://localhost:27017/blog",{
useNewUrlParser:true,
keepAlive:1,
useCreateIndex:true, useUnifiedTopology: true
}, ()=>{console.log("CONNECTED TO DB")}).catch(error => console.log('db connection error', error));



const PORT = process.env.PORT || 3000;


app.get('/',(req, res) => res.send("In Home Page...."));

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));