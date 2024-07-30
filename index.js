const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors"); 

//**Import Custom Module [Routes]
const userRoute = require("./Routes/userRoute");
const folderRoute =require('./Routes/folderRoute')
const formRoute = require('./Routes/formRoute')

// **Create a instance of express and declare port
const app = express();
const PORT = process.env.PORT || 4000;
// Enable CORS
app.use(cors());

// **Listen to the server
app.listen(PORT, () => {
  console.log(`Server is running on the port : ${PORT}`);
});

// connect to mongodb  
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected successfully......")
}).catch((err)=>{
    console.log("something went wrong ;) ")
    console.log(err)
})



// Middleware to parse JSON bodies
app.use(express.json());

// **Use the defined routes
app.use("/user", userRoute);
app.use("/folder",folderRoute)
app.use("/form",formRoute)



