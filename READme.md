====================================================
# 2. Auth Route && controllers
+ /signup - GET - signup page
+ /login - GET - login page
+ /signup - POST - Create a new user in db
+ /login - POST - Authenticate a current user
+ /logout - GET log a user out

======================================================
# 3. Testing routes && handing post request
- take any json data that comes along with request and parse it into js object => we can use inside code
- => app.use(express.json())
- access req json data => app.use(express.json()) parse it => js object -> acess in req.body 

=====================================================
# 4.User model
- const mongoose = require('mongoose');
- const { isEmail } = require('validator'); 
//  create instance 
* const userSchema = new mongoose.Schema({ email: {
- type: String,
- required: [true, 'Please enter an email'],
- lowcase: true,
- unique: true
- isEmail: [isEmail, 'Please enter a valid email']    
} , password: {
- type: String,
- required: [true, 'Please enter password'],
- minLength: [6, 'Minimum password is 6 characters']
} })

* const User = mongoose.model('user', userSchema) // store collection in db is users
* module.exports = User;

======================================================
# 5. Mongoose validation 
- Ex: 'Please enter an email',  'Please enter a valid email'
- handle error: 
<!-- * const handleError = (err) => {
    console.log(err.message, err.code);
    const errors = { email: '', password: '' };

    // duplicate error code (validate unique: true in User Schema)
    if (err.code === 11000 ) {
      errors.email = 'That email is already registered';
      return errors;
    } 
    // validation errors
    if(err.message.includes('user validation failed')) {
        console.log('obj', Object.values(err.errors));
        Object.values(err.errors).forEach(({ properties }) => {
          console.log(properties);
          errors[properties.path] = properties.message;
        })
    }
    return errors;  --> 
} 
- send to client 
=============================================================
# 6. Mongoose hook  