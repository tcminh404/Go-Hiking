package com.gohiking.common.domain.dto.post;

import com.gohiking.common.constant.GohikingConstant.AccessLevel;

import lombok.Data;

@Data
public class PostDTO {
    String postId;
    String parentId;
    String type;
    String title;
    String content;
    String username;
    AccessLevel access;
}
