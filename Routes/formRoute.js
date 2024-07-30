const express = require("express");
const router = express.Router();

const {saveForm,fetchform,deleteform,getFormByUser} = require("../controllers/formController")

const verifyToken = require('../middelwares/verifyToken')


router.post("/saveform",verifyToken,saveForm)


router.get("/fetchform/:formId",fetchform)


router.delete("/deleteform/:id",verifyToken, deleteform);

router.get('/user/:userId', getFormByUser);


module.exports=router