import jwt from 'jsonwebtoken'

const Authentication = (req, res, next) => {
    try{
        const {headers: {authorization}} = req
        
        const [, token] = authorization.split(' ')
    
        const secret = process.env.JWT_KEY
    
        if(!secret) throw new Error('Nenhuma key JWT configurada')
    
        jwt.verify(token, secret)
    
        next()
    }catch(e) {
        const {name} = e
        let message = ''
        
        if(name === 'TokenExpiredError') message = 'Token expirado'
        if(name === 'JsonWebTokenError') message = 'Token inválido'
        
        res.status(400).json({
            success: false,
            message
        })
    }
}

export default Authentication