import express from 'express'

import CharController from './char/CharController'
import AttributeController from './attributes/AttributeController'

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/char', CharController)
app.use('/attribute', AttributeController)

app.get('/', (req, res) => res.send('TESTE'))

app.listen(80, () => console.log('Servidor ON'))