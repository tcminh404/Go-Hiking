package com.gohiking.common.domain.dto.heremap;

import java.util.List;

import lombok.Data;

@Data
public class HereMapGeoDataDTO {
    String title;
    String id;
    String politicalView;
    String resultType;
    String houseNumberType;
    String addressBlockType;
    String localityType;
    String administrativeAreaType;
    HereAddressDTO address;
    HerePositionDTO position;
    List<HerePositionDTO> access;
    double distance;
    HereMapViewDTO mapView;
    List<HereCommonDTO> categories;
    List<HereCommonDTO> foodTypes;
    boolean houseNumberFallback;
    HereTimeZoneDTO timeZone;
}
