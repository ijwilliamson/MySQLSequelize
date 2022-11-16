const Movie = require("./table");

const createMovie = async( movieObject) =>{
    try{
        const newMovie = await Movie.create(movieObject);
        console.log(newMovie);
    } catch (error) {
        console.log(error)
    }
};

const updateMovie = async( movieObject, id) =>{
    try{
        await Movie.update(
            reduceMovie(movieObject),
            {where: {id: id}
        })
        
    } catch (error){
        console.log(error)
    }
}

const deleteMovie = async( id ) =>{
    try{
        await Movie.destroy({
            where: {id: id}
        });

    } catch (error){
        console.log(error)
    }
}

const readMovies = async() => {
    try{
        const Movies = await Movie.findAll();
     
        const Data =  await JSON.parse(JSON.stringify(Movies, null, 2));
        return Data;
        
    } catch (error){
        console.log(error)
    }
}

const searchMovies = async(movieObject) => {
    try{
        const Movies = await Movie.findAll(
            {
                where: reduceMovie(movieObject)
            }
        );
     
        const Data =  await JSON.parse(JSON.stringify(Movies, null, 2));
        return Data;
        
          
    } catch (error){
        console.log(error)
    }
}

const reduceMovie = (movieObject) => {
    const keys = Object.keys(movieObject)
    const values = Object.values(movieObject)
    let modifiedMovie = movieObject;

    // loop through the values and remove the key from modifiedMovie
    // if the value is falsy.
    for(let i=keys.length; i>=0; i--){
        if (!values[i]){
            let {[keys[i]]: unused, ...tempMovie} = modifiedMovie;
            modifiedMovie = tempMovie;
        }
    }

    return modifiedMovie;

}



module.exports = {createMovie, deleteMovie, readMovies, updateMovie, searchMovies};