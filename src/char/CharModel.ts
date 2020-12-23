import {DataTypes} from 'sequelize'
import database from '../database'

import Attribute from '../attributes/AttributeModel'

const Char = database.define('char', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome é obrigatório!'
            },
        }
    },
    gender: {
        type: DataTypes.ENUM(),
        values: ['M', 'F', 'O'],
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O gênero é obrigatório!'
            },
        }
    },
})

Char.sync()

export default Char