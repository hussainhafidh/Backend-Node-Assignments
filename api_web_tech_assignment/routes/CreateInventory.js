const router = require("express").Router()
const Inventory = require("../modals/InventoryModal")
let inv_id = 1

router.post("/createInventory" , async(req,res)=>{
    try{
        const {inventory_type ,  item_name , available_quantity} = req.body

        const Inventry = new Inventory({
            inventory_id:`INTD${++inv_id}00`,
            inventory_type:inventory_type,
            item_name:item_name,
            available_quantity:available_quantity
        })
        Inventry.save().then(()=>{
            return res.status(200).json({
                "Message":"Customer Created Success",
                "Item":Inventry
            })
        })

    }
    catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

router.get("/inventory" , async(req,res)=>{
    try{
       const Inventry = await Inventory.find()
            return res.status(200).json({
                "Inventory":Inventry
            })

    }
    catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

//finding Inventory by there type
router.get("/inventory/:inventory_type" ,async(req,res)=>{
    try{
        const inventory_type = req.params.inventory_type
        const Inventry = await Inventory.find({inventory_type:inventory_type})

        return res.status(200).json({
            "Inventory":Inventry
        })

    }catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

router.get("/:itemName/availableQuantity" ,async(req,res)=>{
    try{
        const item_name = req.params.itemName
        const Inventry = await Inventory.findOne({item_name:item_name})

        return res.status(200).json({
            "Avaliable QTY":Inventry.available_quantity
        })

    }catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

module.exports = router