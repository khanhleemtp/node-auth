const User = require('../models/User');

// controller actions

// handler errors
const handleError = (err) => {
    console.log(err.message, err.code);
    const errors = { email: '', password: '' };

    // duplicate error code
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
    return errors;
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('login');
  }
  
  module.exports.login_post = (req, res) => {
    res.send('user is login');
  }
  
  module.exports.signup_post = async (req, res) => {
    // access req json data => app.use(express.json()) parse it => js object -> acess in req.body 
    // console.log(req.body);
    const { email, password } = req.body;
    try {
      // to do something
        const user = await User.create({ email, password });
      res.status(201).json(user);
    } catch (err) {
      // error
      console.log(err);
      const error = handleError(err);
      res.status(400).send({error});
    }
  }
