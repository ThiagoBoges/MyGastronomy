import express from 'express'
import PlatesControllers from '../controllers/plates.js'

const platesRouter = express.Router()
const platesController = new PlatesControllers()

// Rota GET para todos os pratos (geral)
platesRouter.get('/', async (req, res) => {
    // 1. Pega o objeto de resposta completo do controller
    const httpResponse = await platesController.getPlates()
    // 2. Envia o objeto de resposta completo no corpo
    res.status(httpResponse.statusCode).send(httpResponse)
})



// Rota POST para adicionar um novo prato
platesRouter.post('/', async (req, res) => {
    const httpResponse = await platesController.addPlate(req.body)
    res.status(httpResponse.statusCode).send(httpResponse)
})

// Rota DELETE para um prato específico
platesRouter.delete('/:id', async (req, res) => {
    const httpResponse = await platesController.deletePlate(req.params.id)
    res.status(httpResponse.statusCode).send(httpResponse)
})

// Rota PUT para atualizar um prato específico
platesRouter.put('/:id', async (req, res) => {
    const httpResponse = await platesController.updatePlate(req.params.id, req.body)
    res.status(httpResponse.statusCode).send(httpResponse)
})

// Rota GET para pratos disponíveis
platesRouter.get('/availables', async (req, res) => {
    const httpResponse = await platesController.getAvailablePlates()
    res.status(httpResponse.statusCode).send(httpResponse)
})

export default platesRouter