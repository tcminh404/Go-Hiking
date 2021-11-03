package com.gohiking.geo.dbaccess.model;

import com.gohiking.common.domain.dto.heremap.HereMapGeoDataDTO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "hereMapGeoData")
public class HereMapGeoData extends HereMapGeoDataDTO {
    @Id
    String id;
    long timestamp;
}
