const Director = require("../director/director");
const Movie = require("./table");

const createMovie = async( movieObject) =>{
    try{
        // get an existing director if one exists, otherise create a new one
        let director = await Director.findOne({where: {name: movieObject.director}},
                                              {include:{model: Movie}});
        if (!director)
        {
            director = await Director.create({name: movieObject.director},
                                             {include:{model: Movie}});
        }

        //create a new movie
        const newMovie = await Movie.create({
            title: movieObject.title,
            actor: movieObject.actor
        });

        //asign the new move to the director
        director.addMovie(newMovie);
    

    } catch (error) {
        console.log(error)
    }
};

const updateMovie = async( movieObject, id) =>{
    try{



        if (movieObject.director){
            //update the director

            let movie = await Movie.findByPk(id);
            if (!movie){
                throw "Movie not found";
            }

            let newDirector = await Director.findOne({where: {name: movieObject.director}},
                {include:{model: Movie}});

            if (!newDirector){
                //create director
            }


            let oldDirect = null;
            if (movie.director){
                oldDirector = await Director.findOne({where: {name: movieObject.director}},
                {include:{model: Movie}});
            }

            
            
            
            
            
                if (oldDirector){
                oldDirect.removeMovie(movie)
            }



        }

        if (movieObject.title | movieObject.actor)
        {
            await Movie.update(
                reduceMovie(movieObject),
                {where: {id: id}
            })
        }



       
        
    } catch (error){
        console.log(error)
    }
}

const deleteMovie = async( id ) =>{
    try{
        //delete a movie if one exists with the specified id
        await Movie.destroy({
            where: {id: id}
        });

    } catch (error){
        console.log(error)
    }
}


const readMovies = async() => {
    try{

        //read all movies and include the associated Director
        const Movies = await Movie.findAll({
            include: {model: Director}
        },);
     
        const Data =  await JSON.parse(JSON.stringify(Movies, null, 2));
        return Data;
        
    } catch (error){
        console.log(error)
    }
}

const searchMovies = async(movieObject) => {
    try{

        //Find a director by key
        //if a search by director name is required, it will be necesary to first find the director Id.
        const Movies = await Movie.findAll(
            {
                where: reduceMovie(movieObject),
                include: {model: Director}
            }
        );
     
        const Data =  await JSON.parse(JSON.stringify(Movies, null, 2));
        return Data;
        
          
    } catch (error){
        console.log(error)
    }
}



const reduceMovie = (movieObject) => {
    // remove keys without matching value to prevent Sequelize errors
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