package dev.ali.MovieProject;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public Review createReview(String reviewBody, String userId, String imdbId){
        Review review = reviewRepository.insert(new Review(reviewBody));
        mongoTemplate.update(Movie.class).matching(Criteria.where("imdbId").is(imdbId)).apply(new Update().push("reviewIds").value(review)).first();
        mongoTemplate.update(User.class).matching(Criteria.where("id").is(userId)).apply(new Update().push("reviewIds").value(review)).first();

        return review;
    }

    public void removeReview(String reviewId) {

        // Step 1: Fetch the movie/user by reviewId and remove the review from its reviewIds list
        Query movieQuery = new Query(Criteria.where("reviewIds._id").is(reviewId));
        Movie movie = mongoTemplate.findOne(movieQuery, Movie.class);
        User user = mongoTemplate.findOne(movieQuery, User.class);
        if (movie != null) {
            movie.getReviewIds().removeIf(review -> review.getId().equals(reviewId));

            // Step 2: Update the movie
            mongoTemplate.save(movie);
        }
        if (user != null) {
            user.getReviewIds().removeIf(review -> review.getId().equals(reviewId));

            // Step 2: Update the User
            mongoTemplate.save(user);
        }

        // Step 3: Remove the review from the "reviews" collection
        Query reviewQuery = new Query(Criteria.where("_id").is(reviewId));
        mongoTemplate.remove(reviewQuery, Review.class);
    }

    public Optional<User> getUser(String reviewId) {
        // Fetch the review using the reviewId
        Query reviewQuery = new Query(Criteria.where("reviewIds._id").is(reviewId));
        User user = mongoTemplate.findOne(reviewQuery, User.class);

        return Optional.ofNullable(user);
    }

}
