const { Sequelize, DataTypes} = require('sequelize')
const dbHandler = new Sequelize(
    'data',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
)

exports.artworks = dbHandler.define(
    'artworks',{
        'id':{
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        'title':{
            allowNull: false,
            type: DataTypes.STRING
        },
        'value':{
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }
)

exports.users = dbHandler.define(
    'users',{
        'username':{
            allowNull: false,
            type: DataTypes.STRING
        },
        'password':{
            allowNull: false,
            type: DataTypes.STRING
        }
    }
)