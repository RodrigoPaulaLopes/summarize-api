import {Router} from 'express'
import { SummarizeController } from '../controllers/Summarize.controller'


const routes : Router = Router()
const summarizeController = new SummarizeController()


routes.get('/summarize', summarizeController.index)
routes.post('/summarize', summarizeController.create)