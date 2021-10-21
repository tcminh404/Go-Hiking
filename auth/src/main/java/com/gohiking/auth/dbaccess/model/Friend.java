package com.gohiking.auth.dbaccess.model;

import com.gohiking.common.domain.dto.FriendDTO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Document(collection = "friend")
@EqualsAndHashCode(callSuper = true)
public class Friend extends FriendDTO {
    @Id
    String id;
}
