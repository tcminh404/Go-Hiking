package com.gohiking.geodecoder.dbaccess.model;

import com.gohiking.common.domain.dto.GeoDataDTO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "geoData")
public class GeoData extends GeoDataDTO {
    @Id
    private String geoId;
}
