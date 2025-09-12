// Em src/routes/users.js

import express from 'express'
import controllers from '../controllers/users.js'

const usersRouter = express.Router()
const UsersControllers = new controllers()

usersRouter.get('/', async (req, res) => {
    const { statuscode, body } = await UsersControllers.getUsers()

    res.status(statuscode).send(body);
})

usersRouter.delete('/:id', async (req, res) => {
    const { statuscode, body } = await UsersControllers.deleteUser(req.params.id)

    res.status(statuscode).send(body);
})

usersRouter.put('/:id', async (req, res) => {
    const { statuscode, body } = await UsersControllers.updateUser(req.params.id, req.body)

    res.status(statuscode).send(body);
})

export default usersRouter;