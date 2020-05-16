const express = require('express')
const router = express.Router()
const { getFile , postFile} = require('../controllers/productFile')


router.get('/', getFile)
router.post('/postFile', postFile)

module.exports = router;