package dev.ali.MovieProject;

import java.util.List;

public class UserInfoResponse {
    private String id;
    private String username;
    private String email;
    private List<String> roles;

    private List<Review> reviewIds;

    public UserInfoResponse(String id, String username, String email, List<String> roles, List<Review> reviewIds) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.reviewIds = reviewIds;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Review> getReviewIds() {
        return reviewIds;
    }

    public List<String> getRoles() {
        return roles;
    }
}