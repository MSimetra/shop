import passport from 'passport';
import { Router } from 'express';
import { genPassword } from '../utils/utils';
import { UserController } from '../controllers/user.controller';

export const routes = Router();
const userController = new UserController();

routes.get('/', (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a> or <a href="/login">login</a></p>'
  );
})

routes.get('/register', (req, res, next) => {
  const form = '<h1>Register Page</h1><form method="post" action="/register">\
    Enter Email:<br><input type="email" name="email">\
    <br>Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.status(200).send(form);
})

routes.post('/register', (req, res, next) => {
  req.body.passwordHash = genPassword(req.body.password);

  userController.addUser(req, res);

  // try {
  //   userController.addUser(req, res);
  // } catch (err) {
  //   const form = '<h1>Register Page</h1><form method="post" action="/register">\
  //   Enter Username:<br><input type="text" name="username"><b style="color:FireBrick;"> please choose another username</b>\
  //   <br>Enter Password:<br><input type="password" name="password">\
  //   <br><br><input type="submit" value="Submit"></form>';
  //
  //   res.send(form);
  // }

  res.redirect('/login');
});

routes.get('/login', (req, res, next) => {
  const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

  res.status(200).send(form);
});

routes.post('/login', (req, res, next) => {
  userController.getUser(req, res);
})

routes.post('/login-success', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.status(200).send('\
  <p><a href="/protected-route">Go to route for registered users</a></p>\
  <p><a href="/change-user">Change your profile</a></p>\
  <p><a href="/buy-staff">Buy staff</a></p>\
  <br><p><a href="/">Logout</a></p>');
})