const router = require("express").Router()
const Order = require("../modals/orderModal")
const Inventory = require("../modals/InventoryModal")


router.post("/createOrder" , async(req,res)=>{
    try{
        const {customer_id ,  item_name , inventory_id, quantity} = req.body
         const qty = await Inventory.findOne({inventory_id:inventory_id})

         if(qty.available_quantity < quantity){
            return res.status(400).json({
                "Message":"Out of Stock"
            })
         }else{
            let change = qty.available_quantity - quantity
            let changeMade = {available_quantity:change}
            const changeQty = await Inventory.findByIdAndUpdate(qty._id ,changeMade)
         }

        const orders = new Order({
            customer_id:customer_id,
            inventory_id:inventory_id,
            item_name:item_name,
            quantity:quantity
        })
        orders.save().then(()=>{
            return res.status(200).json({
                "Message":"Order Created Success",
                "Item":orders
            })
        })

    }
    catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

router.get("/orders" , async(req,res)=>{
    try{
       const orders = await Order.find()
            return res.status(200).json({
                "orders":orders
            })

    }
    catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

module.exports = router