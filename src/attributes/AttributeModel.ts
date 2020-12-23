import {DataTypes} from 'sequelize'
import database from '../database'

import Char from '../char/CharModel'

const Attribute = database.define('attribute', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

Attribute.sync()

export default Attribute