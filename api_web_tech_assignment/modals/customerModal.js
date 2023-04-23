const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CustomerModal = new Schema({
    customer_name: { type: String, required: true },
    email: { type: String, required: true },
    customer_id: { type: String, required: true }

})

const Customer = mongoose.model("Customers", CustomerModal)

module.exports = Customer