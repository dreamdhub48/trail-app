const express = require("express");
const { createContact, getContacts, updateContact, deleteContact } = require("../controllers/contactController");
const router = express.Router();

router.post("/", createContact);   // Create
router.get("/", getContacts);      // Read
router.put("/:id", updateContact); // Update
router.delete("/:id", deleteContact); // Delete

module.exports = router;
