import {DataTypes} from 'sequelize'
import database from '../database'

import Char from '../char/CharModel'
import Attribute from '../attributes/AttributeModel'

const CharAttribute = database.define('char_attribute', {
    charId: {
        type: DataTypes.INTEGER,
        references: {
            model: Char,
            key: 'id'
        }
    },
    attributeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Attribute,
            key: 'id'
        }
    },    
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

Char.belongsToMany(Attribute, {through: CharAttribute})
Attribute.belongsToMany(Char, {through: CharAttribute})

export default CharAttribute