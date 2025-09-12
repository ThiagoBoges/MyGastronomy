import express from 'express'
import PlatesControllers from '../controllers/plates.js'

const platesRouter = express.Router()
const platesController = new PlatesControllers()

platesRouter.get('/', async (req, res) => {
    const httpResponse = await platesController.getPlates()

    res.status(httpResponse.statusCode).send(httpResponse)
})


platesRouter.post('/', async (req, res) => {
    const httpResponse = await platesController.addPlate(req.body)
    res.status(httpResponse.statusCode).send(httpResponse)
})

platesRouter.delete('/:id', async (req, res) => {
    const httpResponse = await platesController.deletePlate(req.params.id)
    res.status(httpResponse.statusCode).send(httpResponse)
})

platesRouter.put('/:id', async (req, res) => {
    const httpResponse = await platesController.updatePlate(req.params.id, req.body)
    res.status(httpResponse.statusCode).send(httpResponse)
})

platesRouter.get('/availables', async (req, res) => {
    const httpResponse = await platesController.getAvailablePlates()
    res.status(httpResponse.statusCode).send(httpResponse)
})

export default platesRouter