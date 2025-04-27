import { Router } from 'express';
import { SummarizeController } from '../controllers/Summarize.controller';
import { celebrate, Joi, Segments } from 'celebrate';

const routes: Router = Router();
const summarizeController = new SummarizeController();

routes.get('/summarize', (req, res) => summarizeController.index(req, res));

routes.post(
    '/summarize',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            content: Joi.string().required(),
        }),
    }),
    (req, res) => summarizeController.create(req, res)
);

export default routes;