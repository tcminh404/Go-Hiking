package com.gohiking.common.domain.dto;

import lombok.Data;

@Data
public class GeoDataDTO {
    private String geoId;
    private Double latitude;
    private Double longitude;
    private String address;
}