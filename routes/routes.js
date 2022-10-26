const express = require('express');
const { addUser, isUserExist, deleteUser } = require('../models/user');
const router = express.Router();


router.delete('/delete/:id', async (req, res) => {
    try {
        deleteUser(req.params.id)
        req.flash('message', 'Succesfully deleted');
    } catch (error) {
        console.log(error)
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, lastName, email, homePhone } = req.body;

        if( email === '' && homePhone === '' ) {
            req.flash('message', 'Form must contain home phone or email');
            return res.redirect('/');  
        }

        if (homePhone.length < 6) {
            req.flash('message', 'Home phone must be at least 6 characters');
            return res.redirect('/');
        }

        const verification = await isUserExist(`${name} ${lastName}`);
        if (verification) {
            req.flash('message', 'A user with the same name already exists');
            return res.redirect('/');
        }
        else {
            await addUser(req.body);
            req.flash('message', 'Success');
            return res.redirect('/');
        }
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;

