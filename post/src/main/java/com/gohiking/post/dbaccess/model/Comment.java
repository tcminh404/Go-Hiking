package com.gohiking.post.dbaccess.model;

import com.gohiking.common.domain.dto.post.CommentDTO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Document(collection = "comment")
@EqualsAndHashCode(callSuper = true)
public class Comment extends CommentDTO {
    @Id
    String postId;
}
