// create a reference to the model
let Movie = require("../models/movie");

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function (req, res, next) {
  Movie.find((err, movieList) => {
    // console.log(movieList);
    if (err) {
      return console.error(err);
    } else {
      res.render("movie/list", {
        title: "Movie List",
        movies: movieList,
      });
    }
  });
};

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  Movie.findById(id, (err, movieToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("movie/details", {
        title: "Movie Details",
        movie: movieToShow,
      });
    }
  });
};

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  res.render("movie/add_edit", {
    title: "Add Movie",
    movie: {},
  });
};

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {
  let movie = req.body;
  Movie.create(movie, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/movie/list");
    }
  });
};

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  Movie.findById(id, (err, movieToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("movie/add_edit", {
        title: "Edit Movie",
        movie: movieToEdit,
      });
    }
  });
};

// Processes the data submitted from the Edit form to update a movie
module.exports.processEditPage = (req, res, next) => {
  let id = req.body._id;
  let movie = req.body;
  Movie.updateOne(id, movie, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/movie/list");
    }
  });
};

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;
  Movie.deleteOne(
    {
      _id: id,
    },
    (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        //redirect to movie list /list
        res.redirect("/movie/list");
      }
    }
  );
};
