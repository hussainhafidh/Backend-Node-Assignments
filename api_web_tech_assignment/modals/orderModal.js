const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OrderModal = new Schema({
    customer_id:{type:String , required:true},
    inventory_id:{type:String , required:true},
    item_name:{type:String , required:true},
    quantity:{type:Number , required:true}
})

const Order = mongoose.model("Orders" , OrderModal)

module.exports = Order