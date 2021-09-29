package com.gohiking.post.dbaccess.model;

import com.gohiking.common.domain.dto.post.PostDTO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "post")
public class Post extends PostDTO {
    @Id
    String postId;
}
