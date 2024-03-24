const asyncHanlder = require('express-async-handler')
const Contact = require("../models/contactModel")

const getContacts = asyncHanlder(async(req,res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    return res.status(200).json(contacts);
});


const postContact = asyncHanlder(async(req,res) => {
    const {name,email,phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All fields are required!!")
    }
    const contact = await Contact.create({
        name,email,phone,user_id: req.user.id
    })
    return res.status(201).json(contact);
});

const deleteContact = asyncHanlder(async(req,res) => {
    const deleteContact = await Contact.findById(req.params.id)
    if(!deleteContact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if(deleteContact.user_id.toString()!== req.user.id){
        res.status(403)
        throw new Error("user cannot update contacts of other users")
    }
    await Contact.deleteOne({_id:req.params.id})
    return res.status(200).json(deleteContact);
});

const updateContact = asyncHanlder(async(req,res) => {
    const contact = Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error("Contact not found")     
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user cannot update contacts of other users")
    }
    const updateContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});

    return res.status(200).json(updateContact);
});


const getContact = asyncHanlder(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact) {
        res.status(404)
        throw new error("Contact not found")
    }
    return res.status(200).json(contact);
});
module.exports = {getContacts,postContact,updateContact,deleteContact,getContact}