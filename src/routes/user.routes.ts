import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRoutes = Router();
const userController = new UserController();

// userRoutes.get('/', userController.getUser.bind(userController))
userRoutes.get('/', (req, res) => userController.getUser(req, res))
userRoutes.post('/', (req, res) => userController.addUser(req, res))
userRoutes.patch('/', (req, res) => userController.changeUser(req, res))
userRoutes.delete('/', (req, res) => userController.removeUser(req, res))
// userRoutes.get('/registration', userController.userRegistration)