const Customer = require("../modals/customerModal")
const router = require("express").Router()
let customer_id = 1


router.post("/createCustomer" , async(req,res)=>{
    try{
        const {customer_name , email} = req.body
        const isCustomer = await Customer.findOne({email:email})

        if(isCustomer){
            return res.status(400).json({
                "Message":"User Already Exist With given MAil-Id"
            })
        }
        const customr = new Customer({
            customer_name:customer_name,
            customer_id:`OD00${++customer_id}`,
            email:email,

        })
        customr.save().then(()=>{
            return res.status(200).json({
                "Message":"Customer Created Success",
                "customer":customr
            })
        })

    }
    catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

router.get("/customers" , async(req,res)=>{
    try{
       const customers = await Customer.find()
            return res.status(200).json({
                "Customers":customers
            })

    }
    catch(e){
        return res.status(400).json({
            "message":e.message
        })
    }
})

module.exports = router