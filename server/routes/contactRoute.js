const express = require('express')
const { addContact, getAllContacts} = require('../controller/contactController')

const router = express.Router()

router.post('/addContact', addContact)
router.get('/getAllContacts/:_id', getAllContacts)

module.exports = router