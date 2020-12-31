import express from 'express'

import AuthMiddleware from './middlewares/auth'
import UserController from './user/UserController'
import CharController from './char/CharController'
import AttributeController from './attributes/AttributeController'

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/user', UserController)

app.use(AuthMiddleware)

app.use('/char', CharController)
app.use('/attribute', AttributeController)

app.get('/', (req, res) => res.send('TESTE'))

app.listen(80, () => console.log('Servidor ON'))