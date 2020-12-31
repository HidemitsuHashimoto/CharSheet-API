import {Router} from 'express'

const router = Router()

router.post('/new', (req, res) => {
    console.log('Criar')
})

router.put('/edit', (req, res) => {
    console.log('Editar')
})

router.delete('/delete', (req, res) => {
    console.log('Deletar')
})

export default router