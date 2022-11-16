const yargs = require('yargs');

const { sequelize } = require ('./db/connection');
const { createMovie, deleteMovie, readMovies, updateMovie, searchMovies} = require('./movie/function');

const app = async (yargsObject) => {

    await sequelize.sync();

    if (yargsObject.create){
        //create code
        await createMovie({
            title: yargsObject.title,
            actor: yargsObject.actor,
            director: yargsObject.director
        });

    } else if (yargsObject.update){
        await updateMovie({
            title: yargsObject.title,
            actor: yargsObject.actor,
            director: yargsObject.director
        }, yargsObject.id);

    } else if (yargsObject.read){
        console.table( await readMovies())

    } else if (yargsObject.delete){
        console.log(await deleteMovie(yargsObject.id))

    } else if (yargsObject.search){
        console.table(await searchMovies(
            {
                title: yargsObject.title,
                actor: yargsObject.actor,
                director: yargsObject.director
            }
        ))
    }
     else {
        console.log("Command not recognised")
    }

    

}

app(yargs.argv);