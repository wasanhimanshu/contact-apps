const express =  require('express')
const {getContacts,postContact,updateContact,deleteContact,getContact} = require("../controllers/contactController")
const validateToken = require("../middlewares/validTokenHandler")
const router =  express.Router()

router.use(validateToken)
router.route("/").get(getContacts).post(postContact)

router.route("/:id").delete(deleteContact).put(updateContact).get(getContact)

module.exports = router
