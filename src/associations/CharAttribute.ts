import {DataTypes} from 'sequelize'
import database from '../database'

import Char from '../char/CharModel'
import Attribute from '../attributes/AttributeModel'

const CharAttribute = database.define('char_attribute', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },   
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O valor do attributo é obrigatório!'
            },
            notNull: {
                msg: 'O valor do attributo é obrigatório!'
            }
        }
    }
})

Char.belongsToMany(Attribute, {through: CharAttribute})
Attribute.belongsToMany(Char, {through: CharAttribute})
CharAttribute.belongsTo(Char)
CharAttribute.belongsTo(Attribute)
Char.hasMany(CharAttribute)
Attribute.hasMany(CharAttribute)

CharAttribute.sync()

export default CharAttribute