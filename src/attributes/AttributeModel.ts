import {DataTypes} from 'sequelize'
import database from '../database'

import Char from '../char/CharModel'

const Attribute = database.define('attribute', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O título é obrigatório!'
            },
        }
    }
})

Attribute.sync()

export default Attribute