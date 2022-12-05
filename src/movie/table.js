const { DataTypes } = require ('sequelize');
const {sequelize } = require( '../db/connection');
const Director = require("../director/director")

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    title : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    actor : {
        type: DataTypes.STRING,
        defaultValue: "Not specified"
    }

},
{timestamps: false});


Movie.belongsTo(Director);
Director.hasMany(Movie);




module.exports = Movie;