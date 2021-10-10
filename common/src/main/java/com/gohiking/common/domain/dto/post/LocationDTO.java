package com.gohiking.common.domain.dto.post;

import lombok.Data;

@Data
public class LocationDTO {
    String postId;
    String parentId;
    String type;
    double lat;
    double lng;
    String address;
    String img;
    String content;
    String username;
}
