const { DataTypes, STRING } = require ('sequelize');
const {sequelize } = require( '../db/connection');


const Director = sequelize.define('Director',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    name: {
        type: DataTypes.STRING,
        required: true,
        unique: true}
    },
    {timestamps: false}
);



module.exports = Director;

