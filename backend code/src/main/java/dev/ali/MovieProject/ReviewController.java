package dev.ali.MovieProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping //create review with review body and username and the imdbId of the movie being reviewed
    public ResponseEntity<Review> createReview(@RequestBody Map<String, String> payload) {
        return new ResponseEntity<Review>(reviewService.createReview(payload.get("reviewBody"),payload.get("userId"), payload.get("imdbId")), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @DeleteMapping("/{reviewId}") // remove a review by reviewId
    public ResponseEntity<Void> removeReview(@PathVariable String reviewId) {
        reviewService.removeReview(reviewId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{reviewId}/user") //get single user by reviewId
    public ResponseEntity<Optional<User>> getUser(@PathVariable String reviewId){
        return new ResponseEntity<Optional<User>>(reviewService.getUser(reviewId), HttpStatus.OK);
    }
}
