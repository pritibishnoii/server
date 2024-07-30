const express = require("express");
const router = express.Router();


const { createFolder, getFolders, updateFolder, deleteFolder, getFoldersByUser, getFolderId } = require("../controllers/folderControler")

const verifyToken = require('../middelwares/verifyToken')


// Create a new folder
router.post("/createfolder/:id", verifyToken, createFolder);

// Get all folders
router.get("/getfolders", verifyToken, getFolders);

// Update a folder by ID
router.put("/updatefolder/:id", verifyToken, updateFolder);

// Delete a folder by ID
router.delete("/deletefolder/:id", verifyToken, deleteFolder);

router.get('/user/:userId', getFoldersByUser);

router.get('/getfolderid', verifyToken, getFolderId)


module.exports = router;