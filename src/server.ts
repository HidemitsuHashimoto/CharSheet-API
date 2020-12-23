import express from 'express'
import connection from './database'

import CharController from './char/CharController'
import AttributeController from './attributes/AttributeController'

connection
    .authenticate()
    .then(() => console.log('Conexão com db realizada com sucesso.'))
    .catch(error => console.log(error))

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/char', CharController)
app.use('/attribute', AttributeController)

app.get('/', (req, res) => res.send('TESTE'))

app.listen(80, () => console.log('Servidor ON'))