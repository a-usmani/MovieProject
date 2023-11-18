package dev.ali.MovieProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(String imdbId){
        return movieRepository.findMovieByImdbId(imdbId);
    }

    public Movie createMovie(String imdbId, String title, String releaseDate, String trailerLink, String poster, List<String> genres, List<String> backdrops, List<Review> reviewIds) {
        Movie movie = new Movie(imdbId, title, releaseDate, trailerLink, poster, genres, backdrops, reviewIds);
        return movieRepository.save(movie);
    }

    public void removeMovie(String imdbId) {
        Query query = new Query(Criteria.where("imdbId").is(imdbId));
        mongoTemplate.remove(query, Movie.class);
    }
}