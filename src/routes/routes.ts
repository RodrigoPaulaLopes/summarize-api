import { Router } from 'express';
import { SummarizeController } from '../controllers/Summarize.controller';
import { celebrate, Joi, Segments } from 'celebrate';

const routes: Router = Router();
const summarizeController = new SummarizeController();

routes.get('/summarize', (req, res) => summarizeController.index(req, res));
routes.get('/summarize/:id', (req, res) => summarizeController.show(req, res));
routes.delete('/summarize/:id', (req, res) => summarizeController.delete(req, res));

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
routes.put(
    '/summarize/:id',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            content: Joi.string().required(),
        }),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().required(),
        }),
    }),
    (req, res) => summarizeController.update(req, res)
);

export default routes;