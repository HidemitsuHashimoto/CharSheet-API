import {DataTypes} from 'sequelize'
import database from 'database'

import Char from 'char/CharModel'

const Attribute = database.define('attribute', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Attribute.belongsToMany(Char, {through: 'char_attribute'})

Attribute.sync()

export default Attribute