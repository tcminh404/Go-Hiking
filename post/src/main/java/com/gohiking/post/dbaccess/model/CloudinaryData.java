package com.gohiking.post.dbaccess.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "cloudinary")
public class CloudinaryData {
    String signature;
    String format;
    String resource_type;
    String secure_url;
    String created_at;
    String asset_id;
    String version_id;
    String type;
    String version;
    String url;
    String public_id;
    String[] tags;
    String original_filename;
    String api_key;
    String bytes;
    String width;
    String etag;
    boolean placeholder;
    String height;
}
