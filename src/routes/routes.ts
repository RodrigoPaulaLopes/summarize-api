import { Router } from 'express';
import authRoutes from './auth.routes'
import summarizeRoutes from './summarize.routes'

const routes: Router = Router();

routes.use('/auth', authRoutes)
routes.use('/summarize', summarizeRoutes)

export default routes;