package dev.ali.MovieProject;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "*")
public class MovieController {
    @Autowired
    private MovieService movieService;
    @GetMapping //get entire collection of movies
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity<List<Movie>>(movieService.allMovies(), HttpStatus.OK);
    }

    @GetMapping("/{imdbId}") //get single movie by imdbId
    public ResponseEntity<Optional<Movie>> getSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movie>>(movieService.singleMovie(imdbId), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping("/create") // create a new movie with parameters
    public ResponseEntity<Movie> createMovie(@RequestBody Map<String, Object> payload) {
        String imdbId = (String) payload.get("imdbId");
        String title = (String) payload.get("title");
        String releaseDate = (String) payload.get("releaseDate");
        String trailerLink = (String) payload.get("trailerLink");
        String poster = (String) payload.get("poster");
        List<String> genres = (List<String>) payload.get("genres");
        List<String> backdrops = (List<String>) payload.get("backdrops");
        List<Review> reviewIds = (List<Review>) payload.get("reviewIds");

        Movie createdMovie = movieService.createMovie(imdbId, title, releaseDate, trailerLink, poster, genres, backdrops, reviewIds);
        return new ResponseEntity<>(createdMovie, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    @DeleteMapping("/{imdbId}") // remove a movie by imdbId
    public ResponseEntity<Void> removeMovie(@PathVariable String imdbId) {
        movieService.removeMovie(imdbId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
