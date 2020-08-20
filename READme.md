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
* const handleError = (err) => {
*    console.log(err.message, err.code);
*     const errors = { email: '', password: '' };
* 
*   // duplicate error code (validate unique: true in User Schema)
*    if (err.code === 11000 ) {
*       errors.email = 'That email is already registered';
*       return errors;
*     } 
*     // validation errors
*     if(err.message.includes('user validation failed')) {
*        console.log('obj', Object.values(err.errors));
*         Object.values(err.errors).forEach(({ properties }) => {
*           console.log(properties);
*           errors[properties.path] = properties.message;
*         })
*     }
*     return errors;  
*  } 
- send to client 
=============================================================
# 6. Mongoose hook  
# after or before saved in db
*  // fire a function afer saved to db
*  userSchema.post('save', (doc, next) => {
*     console.log('New user was saved and created: ', doc );
*    next();
* })

*  // fire a function before saved to db 
*  userSchema.pre('save', function(next) {
*     // this is pointing to instance of User save to db (in authController.js: const user = await User.create({ email, password }))
*     console.log('User about to be created and saved', this);
*     next();
* })

- post: middleware are executed after the hooked method and all of its pre middleware have completed.
- pre: Pre middleware functions are executed one after another, when each middleware calls next.
- save: method of mongoose 
- doc: document in db
- next: middleware when you call to allow continue process
- this: instance of model 

==============================================================
# 7. Hashing password    
- password: plain text -> hash
- (salt + password) -> hashing algorithm -> %5sfffm..

==========================================================
# 8.auth views
- const form = document.querySelector('form');
- const email = form.email.value;

=========================================================
# 9.cookies primer
- Cookies 
+ Store data in a user's browser: name:Ld, age: 30, isEmpty: true
+ Server(config: cookies) <---------> Browser(access to server )
- res.setHeader('Set-Cookie', 'newUser=true')
- middleware cookie-parser
* set-cookie
+ const cookieParse = require('cookie-parser');
+ res.cookie('newUser', true, { httpOnly: true, secure: true, maxAge: 1000*60*60*24 })
+ secure: use only https
+ httpOnly: brower not access to cookie through to document.cookie
+ maxAge: mili second
- > time in session = maxAge, default: when I close browser -> reset cookie, server-config
- const cookies = req.cookies <-> res.json(cookies);

================================================================
# 10. json web tokens (theory)
- > + Browser(login-form) -----email, pass------> Server -------> check credentials in db 
  > + Server --------jwt(to be encoded and store in cookies)--------> browser (use authenticate)
  > +  Use each request browser --------jwt---------> server( verify the jwt identify the user)
  > + csrf (expose cookie, endpoint) -> Hacker Access server, change data, ....

- Jwt signing
+ Header: Tell the server the type of signature is being used(meta)
+ Payload: Used to identify the user(eg: contains user id)
+ Verify signature: Makes the token secure(like a stamp of authenticity)

 > Header ---->
 >          signature -------------> hashed together --------- secret('secure secret string(sever use to authen)')                  
 > Payload ---> 