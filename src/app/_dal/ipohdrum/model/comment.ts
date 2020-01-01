/**
 * Ipoh Drum Laravel API
 * This is a swagger-generated API documentation for the project Ipoh Drum. (Only supports OpenAPI Annotations for now.)
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: henry_lcz97@hotmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface Comment { 
    id?: number;
    video_id?: number;
    article_id?: number;
    article_image_id?: number;
    uid?: string;
    text?: string;
    imgpath?: string;
    imgpublicid?: string;
    like?: number;
    dislike?: number;
    type?: string;
    status?: number;
    created_at?: string;
    updated_at?: string;
}

