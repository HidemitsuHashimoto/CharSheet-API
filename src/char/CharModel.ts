import {DataTypes} from 'sequelize'
import database from 'database'

import Attributes from 'attributes/AttributeModel'

const Char = database.define('char', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM(),
        values: ['M', 'F', 'O'],
        allowNull: false,
    },
})

Char.belongsToMany(Attributes, {through: 'char_attribute'})

Char.sync()

export default Char