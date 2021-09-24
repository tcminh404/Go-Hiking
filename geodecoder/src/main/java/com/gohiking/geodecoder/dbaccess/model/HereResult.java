package com.gohiking.geodecoder.dbaccess.model;

import java.util.List;

import lombok.Data;

@Data
public class HereResult {
    List<HereMapGeoData> items;
}
