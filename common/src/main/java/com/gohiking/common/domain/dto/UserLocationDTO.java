package com.gohiking.common.domain.dto;

import com.gohiking.common.constant.GohikingConstant.AccessLevel;

import lombok.Data;

@Data
public class UserLocationDTO {
    String id;
    String userName;
    String lat;
    String lng;
    AccessLevel access;
}
