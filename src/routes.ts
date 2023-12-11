import { Router } from "express";
import usersRouter from './controllers/userController';
const router = Router();

router.use('/users', usersRouter);

export default router;