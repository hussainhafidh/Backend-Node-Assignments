const express = require('express')
const contactModel = require('../model/contact')
const router = express.Router()

//create a new contact
router.post('/contacts', async (req, res) => {
    const { firstName, lastName, email, phone } = req.body

    //to check if required fields are present 
    if (!firstName) {
        return res.status(400).json({ error: "Missing required field(s): firstName" })
    }
    if (!lastName) {
        return res.status(400).json({ error: "Missing required field(s): lastName" })
    }
    if (!email) {
        return res.status(400).json({ error: "Missing required field(s): email" })
    }
    if (!phone) {
        return res.status(400).json({ error: "Missing required field(s): phone" })
    }

    const newContact = new contactModel({
        firstName,
        lastName,
        email,
        phone
    })

    try {
        await newContact.save()
        res.status(201).json({
            newContact
        })
    } catch (err) {
        console.log(err);
    }

})

//list all contacts
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await contactModel.find()
        res.status(200).json(contacts)
    } catch (err) {
        console.log(err);
    }
})

//get a specific contact 
router.get('/contacts/:id', async (req, res) => {
    const contactId = req.params.id
    try {
        const contact = await contactModel.findOne({ _id: contactId })
        if (!contact) {
            res.status(404).json({ error: "There is no contact with that id" })
        } else {
            res.status(200).json(contact)
        }
    } catch (err) {
        console.log(err);
    }
})

//delete a specific contact
router.delete('/contacts/:id', async (req, res) => {
    const contactId = req.params.id
    try {
        await contactModel.deleteOne({ _id: contactId })
        res.status(204).json("None")
    } catch (err) {
        console.log(err);
    }
})

//update a specific contact by id
router.put('/contacts/:id', async (req, res) => {
    const id = req.params.id
    const { firstName, lastName, email, phone } = req.body
    const updateContact = {
        firstName,
        lastName,
        email,
        phone
    }
    try {
        const contact = await contactModel.findByIdAndUpdate(id, updateContact)
        if (!contact) {
            res.status(404).json({ error: 'There is no contact with that id' })
        } else {
            res.status(204).json(updateContact)
        }
    } catch (err) {
        console.log(err);
    }
})

//update a specific contact with partial data'
router.patch('/contacts/:id', async (req, res) => {
    const id = req.params.id
    const { firstName, lastName, email, phone } = req.body
    const updateContact = {}

    if (firstName) {
        updateContact.firstName = firstName
    }
    if (lastName) {
        updateContact.lastName = lastName
    }
    if (email) {
        updateContact.email = email
    }
    if (phone) {
        updateContact.phone = phone
    }

    try {
        const contact = await contactModel.findByIdAndUpdate(id, updateContact)
        if (!contact) {
            res.status(404).json({ error: 'There is no contact with that id' })
        } else {
            res.status(204).json(contact)
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router


/*
1 done
2 done
3 done
4 done
5 done
6 done
7 done
*/