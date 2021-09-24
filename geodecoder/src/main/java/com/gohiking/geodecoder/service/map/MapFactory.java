package com.gohiking.geodecoder.service.map;

import com.gohiking.geodecoder.service.MapService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import static com.gohiking.common.constant.GohikingConstant.MapServiceProvider.*;

@Configuration
public class MapFactory {

    @Value("${spring.mapservice.server}")
    String server;

    @Autowired
    @Qualifier("heremap")
    MapService hereMapService;

    @Autowired
    @Qualifier("googlemap")
    MapService googleMapService;

    @Bean
    @Primary
    public MapService getMapService() {
        switch (server) {
            case HEREMAP:
                return hereMapService;
            case GOOGLEMAP:
                return googleMapService;
            default:
                return null;
        }
    }
}
