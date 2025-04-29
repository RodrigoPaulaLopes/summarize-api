import { Router } from 'express';
import authRoutes from './auth.routes'
import summarizeRoutes from './summarize.routes'
import AuthenticationMiddleware from '../middleware/authentication.middleware';

const routes: Router = Router();

const authentication = new AuthenticationMiddleware()

routes.use('/auth', authRoutes)
routes.use('/summarize', (req, res, next) => authentication.execute(req, res, next), summarizeRoutes)

export default routes;