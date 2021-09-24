package com.gohiking.common.domain.dto.heremap;

import lombok.Data;

@Data
public class HereAddressDTO {
    String label;
    String countryCode;
    String countryName;
    String stateCode;
    String state;
    String countyCode;
    String county;
    String city;
    String district;
    String subdistrict;
    String street;
    String block;
    String subblock;
    String postalCode;
    String houseNumber;
}
