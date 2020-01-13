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
import { Warranty } from './warranty';
import { ProductCharacteristic } from './productCharacteristic';
import { InventoryFamily } from './inventoryFamily';
import { Store } from './store';
import { Shipping } from './shipping';
import { InventoryImage } from './inventoryImage';
import { ProductReview } from './productReview';
import { ProductPromotion } from './productPromotion';


export interface Inventory { 
    id?: number;
    store_id?: number;
    product_promotion_id?: number;
    shipping_id?: number;
    warranty_id?: number;
    uid?: string;
    code?: string;
    sku?: string;
    name?: string;
    imgpublicid?: string;
    imgpath?: string;
    desc?: string;
    rating?: number;
    cost?: number;
    price?: number;
    qty?: number;
    promoendqty?: number;
    promopctg?: number;
    promoprice?: string;
    totalproductreview?: number;
    salesqty?: number;
    stockthreshold?: number;
    status?: number;
    onsale?: number;
    created_at?: string;
    updated_at?: string;
    store?: Store;
    promotion?: ProductPromotion;
    warranty?: Warranty;
    shipping?: Shipping;
    inventoryfamilies?: Array<InventoryFamily>;
    images?: Array<InventoryImage>;
    reviews?: Array<ProductReview>;
    characteristics?: Array<ProductCharacteristic>;
}

