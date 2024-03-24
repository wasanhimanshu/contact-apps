require('dotenv').config()
const express = require('express')
const contactRouter = require("./routes/contactRoutes")
const userRouter  = require("./routes/userRoutes")
const errorHandler = require("./middlewares/errorHandler")
const connectToDb = require("./config/dbConnection")
const PORT = process.env.PORT || 5000
const app = express()

connectToDb()
app.use(express.json())
app.use("/api/contacts",contactRouter)
app.use("/api/users",userRouter)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`)
})