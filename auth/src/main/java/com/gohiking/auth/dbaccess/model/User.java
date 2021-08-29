package com.gohiking.auth.dbaccess.model;

import com.gohiking.common.domain.dto.UserDTO;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document("user")
public class User extends UserDTO {

}
