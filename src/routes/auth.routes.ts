import { Router } from 'express';
import { SummarizeController } from '../controllers/Summarize.controller';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthenticationController from '../controllers/authentication.controller';

const routes: Router = Router();
const authenticationController = new AuthenticationController();


routes.post(
    '/register',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            first_name: Joi.string().empty(),
            last_name: Joi.string().empty()
        }),
    }),
    (req, res) => authenticationController.signup(req, res)
);

routes.post(
    '/login',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    (req, res) => authenticationController.signin(req, res)
);


export default routes;