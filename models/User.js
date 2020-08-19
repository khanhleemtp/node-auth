const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bycrypt = require('bcryptjs');
require('dotenv').config();

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        // duy nhất _ err.code
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minium password length is 6 characters'],
    }
});

// fire a function afer saved to db
userSchema.post('save', (doc, next) => {
    console.log('New user was saved and created: ', doc );
    next();
})

// fire a function before saved to db 
userSchema.pre('save', async function(next) {
    // this is pointing to instance of User save to db (in authController.js: const user = await User.create({ email, password }))
    console.log('User about to be created and saved', this);
    const salt = await bycrypt.genSalt();
    console.log(salt);
    this.password = await bycrypt.hash(this.password, salt);
    next();
})

// save in db collection is users 
const User = mongoose.model('user', userSchema);

module.exports = User;