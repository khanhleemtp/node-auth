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