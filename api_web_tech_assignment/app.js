const express = require("express")
const app = express()
const CreateCustomerRoute = require("./routes/CreateCustomerRoute")
const CreateInventory = require("./routes/CreateInventory")
const CreateOrder = require("./routes/CreateOrders")
const bodyparser = require("body-parser")

app.use(bodyparser.json())
app.use(express.json())



app.get("/", (req,res)=>{
    res.status(200).json({
        "Message":"Server is Ok"
    })
})
app.use("/" , CreateCustomerRoute)
app.use("/" , CreateInventory)
app.use("/" , CreateOrder)


module.exports = app;