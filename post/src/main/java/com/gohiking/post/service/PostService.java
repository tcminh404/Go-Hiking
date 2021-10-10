package com.gohiking.post.service;

import java.util.List;
import javax.annotation.PostConstruct;

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gohiking.post.dbaccess.model.*;
import com.gohiking.post.dbaccess.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
public class PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    CloudinaryRepository cloudinaryRepository;

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    @Value("${cloudinary.api_key}")
    private String apiKey;

    @Value("${cloudinary.api_secret}")
    private String apiSecret;

    Cloudinary cloudinary;

    @PostConstruct
    void init() {
        cloudinary = new Cloudinary(
                ObjectUtils.asMap("cloud_name", cloudName, "api_key", apiKey, "api_secret", apiSecret, "secure", true));
    }

    public Post upsertPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    public String deletePost(String postId) {
        commentRepository.deleteByParentId(postId);
        locationRepository.findByParentId(postId).forEach((item) -> {
            deleteFile(item.getImg());
        });
        locationRepository.deleteByParentId(postId);
        postRepository.deleteById(postId);
        return "Success";
    }

    public Comment upsertComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    public List<Comment> getComments(String parentId) {
        return commentRepository.findByParentId(parentId);
    }

    public String deleteComment(String postId) {
        commentRepository.deleteById(postId);
        return "Success";
    }

    public String uploadFile(MultipartFile file) {
        try {
            CloudinaryData data = new ObjectMapper().readValue(
                    new ObjectMapper()
                            .writeValueAsString(cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap())),
                    CloudinaryData.class);
            cloudinaryRepository.save(data);
            return data.getSecure_url();
        } catch (Exception e) {
            log.info(e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.toString());
        }
    }

    public String deleteFile(String url) {
        CloudinaryData data = cloudinaryRepository.findBySecureUrl(url);
        if (data != null)
            try {
                cloudinary.uploader().destroy(data.getPublic_id(), ObjectUtils.emptyMap());
                cloudinaryRepository.delete(data);
            } catch (Exception e) {
                log.info(e);
                return e.toString();
            }
        return "Success";
    }

    public Location upsertLocation(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> getLocations() {
        return locationRepository.findAll();
    }

    public List<Location> getLocations(String parentId) {
        return locationRepository.findByParentId(parentId);
    }

    public String deleteLocation(String postId) {
        if (locationRepository.findById(postId).isPresent())
            deleteFile(locationRepository.findById(postId).get().getImg());
        locationRepository.deleteById(postId);
        return "Success";
    }
}
