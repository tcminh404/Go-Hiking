package com.gohiking.common.domain.dto.post;

import lombok.Data;

@Data
public class PostDTO {
    String postId;
    String parentId;
    String type;
    String title;
    String content;
    String username;
}
