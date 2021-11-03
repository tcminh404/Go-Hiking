package com.gohiking.geo.dbaccess.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "geoData")
public class GeoData {
    @Id
    private String geoId;
    private Double latitude;
    private Double longitude;
    private String address;
}
