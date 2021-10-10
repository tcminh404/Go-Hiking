package com.gohiking.common.domain.dto.post;

import lombok.Data;

@Data
public class CommentDTO {
    String postId;
    String parentId;
    String type;
    String content;
    String username;
}
