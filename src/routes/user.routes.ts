import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.getUser)
userRoutes.post('/', userController.addUser)
userRoutes.patch('/', userController.changeUser)
userRoutes.delete('/', userController.removeUser)
// userRoutes.get('/registration', userController.userRegistration)