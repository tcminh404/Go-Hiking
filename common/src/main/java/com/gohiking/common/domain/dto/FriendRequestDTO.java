package com.gohiking.common.domain.dto;

import lombok.Data;

@Data
public class FriendRequestDTO {
    String id;
    String userId;
    String requestUsername;
    String targetUsername;
    String msg;
}
