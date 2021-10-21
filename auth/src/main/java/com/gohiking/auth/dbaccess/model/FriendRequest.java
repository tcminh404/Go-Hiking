package com.gohiking.auth.dbaccess.model;

import com.gohiking.common.domain.dto.FriendRequestDTO;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Document(collection = "request")
@EqualsAndHashCode(callSuper = true)
public class FriendRequest extends FriendRequestDTO {
    @Id
    String id;
}
