import express from 'express'
import connection from './database'

import CharController from './char/CharController'
import CharModel from './char/CharModel'

import AttributeModel from './attributes/AttributeModel'

connection
    .authenticate()
    .then(() => console.log('Conexão com db realizada com sucesso.'))
    .catch(error => console.log(error))

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/char', CharController)


app.get('/', (req, res) => res.send('TESTE'))

app.listen(80, () => console.log('Servidor ON'))