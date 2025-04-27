import {Router} from 'express'
import { SummarizeController } from '../controllers/Summarize.controller'


const routes : Router = Router()
const summarizeController = new SummarizeController()


routes.get('/summarize', (req, res) => summarizeController.index(req, res))
routes.post('/summarize', (req, res) => summarizeController.create(req, res))


export default routes