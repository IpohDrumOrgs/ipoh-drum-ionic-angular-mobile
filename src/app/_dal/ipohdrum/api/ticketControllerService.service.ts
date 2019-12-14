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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class TicketControllerServiceService {

    protected basePath = 'http://localhost:8000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * Creates a ticket.
     * @param name Ticketname
     * @param storeId Store ID
     * @param productPromotionId Promotion ID
     * @param sku Sku
     * @param price Product Selling Price
     * @param qty Stock Qty
     * @param enddate Valid end date
     * @param onsale On Sale
     * @param code Code
     * @param desc Product Description
     * @param imgpath Image Path
     * @param stockthreshold Stock Threshold
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createTicket(name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createTicket(name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createTicket(name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createTicket(name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling createTicket.');
        }
        if (storeId === null || storeId === undefined) {
            throw new Error('Required parameter storeId was null or undefined when calling createTicket.');
        }
        if (productPromotionId === null || productPromotionId === undefined) {
            throw new Error('Required parameter productPromotionId was null or undefined when calling createTicket.');
        }
        if (sku === null || sku === undefined) {
            throw new Error('Required parameter sku was null or undefined when calling createTicket.');
        }
        if (price === null || price === undefined) {
            throw new Error('Required parameter price was null or undefined when calling createTicket.');
        }
        if (qty === null || qty === undefined) {
            throw new Error('Required parameter qty was null or undefined when calling createTicket.');
        }
        if (enddate === null || enddate === undefined) {
            throw new Error('Required parameter enddate was null or undefined when calling createTicket.');
        }
        if (onsale === null || onsale === undefined) {
            throw new Error('Required parameter onsale was null or undefined when calling createTicket.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (storeId !== undefined && storeId !== null) {
            queryParameters = queryParameters.set('store_id', <any>storeId);
        }
        if (productPromotionId !== undefined && productPromotionId !== null) {
            queryParameters = queryParameters.set('product_promotion_id', <any>productPromotionId);
        }
        if (code !== undefined && code !== null) {
            queryParameters = queryParameters.set('code', <any>code);
        }
        if (sku !== undefined && sku !== null) {
            queryParameters = queryParameters.set('sku', <any>sku);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (imgpath !== undefined && imgpath !== null) {
            queryParameters = queryParameters.set('imgpath', <any>imgpath);
        }
        if (price !== undefined && price !== null) {
            queryParameters = queryParameters.set('price', <any>price);
        }
        if (qty !== undefined && qty !== null) {
            queryParameters = queryParameters.set('qty', <any>qty);
        }
        if (stockthreshold !== undefined && stockthreshold !== null) {
            queryParameters = queryParameters.set('stockthreshold', <any>stockthreshold);
        }
        if (enddate !== undefined && enddate !== null) {
            queryParameters = queryParameters.set('enddate', <any>enddate);
        }
        if (onsale !== undefined && onsale !== null) {
            queryParameters = queryParameters.set('onsale', <any>onsale);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/ticket`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set ticket\&#39;s \&#39;status\&#39; to 0.
     * @param uid Ticket ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteTicketByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteTicketByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteTicketByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteTicketByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteTicketByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/ticket/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of tickets
     * Returns list of filtered tickets
     * @param pageNumber Page number
     * @param pageSize number of pageSize
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To date for filter
     * @param onsale On sale for filter
     * @param status status for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterTickets(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, onsale?: string, status?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterTickets(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, onsale?: string, status?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterTickets(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, onsale?: string, status?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterTickets(pageNumber?: number, pageSize?: number, keyword?: string, fromdate?: string, todate?: string, onsale?: string, status?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }
        if (keyword !== undefined && keyword !== null) {
            queryParameters = queryParameters.set('keyword', <any>keyword);
        }
        if (fromdate !== undefined && fromdate !== null) {
            queryParameters = queryParameters.set('fromdate', <any>fromdate);
        }
        if (todate !== undefined && todate !== null) {
            queryParameters = queryParameters.set('todate', <any>todate);
        }
        if (onsale !== undefined && onsale !== null) {
            queryParameters = queryParameters.set('onsale', <any>onsale);
        }
        if (status !== undefined && status !== null) {
            queryParameters = queryParameters.set('status', <any>status);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/ticket`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves ticket by Uid.
     * @param uid Ticket_ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTicketByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getTicketByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getTicketByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getTicketByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getTicketByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/ticket/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of tickets
     * Returns list of tickets
     * @param pageNumber Page number
     * @param pageSize number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTickets(pageNumber?: number, pageSize?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getTickets(pageNumber?: number, pageSize?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getTickets(pageNumber?: number, pageSize?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getTickets(pageNumber?: number, pageSize?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('pageSize', <any>pageSize);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/ticket`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update ticket by Uid.
     * @param uid Ticket_ID, NOT \&#39;ID\&#39;.
     * @param name Ticketname
     * @param storeId Store ID
     * @param productPromotionId Promotion ID
     * @param sku Sku
     * @param price Product Selling Price
     * @param qty Stock Qty
     * @param enddate Valid end date
     * @param onsale On Sale
     * @param code Code
     * @param desc Product Description
     * @param imgpath Image Path
     * @param stockthreshold Stock Threshold
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateTicketByUid(uid: string, name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateTicketByUid(uid: string, name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateTicketByUid(uid: string, name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateTicketByUid(uid: string, name: string, storeId: number, productPromotionId: number, sku: string, price: number, qty: number, enddate: string, onsale: number, code?: string, desc?: string, imgpath?: string, stockthreshold?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateTicketByUid.');
        }
        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling updateTicketByUid.');
        }
        if (storeId === null || storeId === undefined) {
            throw new Error('Required parameter storeId was null or undefined when calling updateTicketByUid.');
        }
        if (productPromotionId === null || productPromotionId === undefined) {
            throw new Error('Required parameter productPromotionId was null or undefined when calling updateTicketByUid.');
        }
        if (sku === null || sku === undefined) {
            throw new Error('Required parameter sku was null or undefined when calling updateTicketByUid.');
        }
        if (price === null || price === undefined) {
            throw new Error('Required parameter price was null or undefined when calling updateTicketByUid.');
        }
        if (qty === null || qty === undefined) {
            throw new Error('Required parameter qty was null or undefined when calling updateTicketByUid.');
        }
        if (enddate === null || enddate === undefined) {
            throw new Error('Required parameter enddate was null or undefined when calling updateTicketByUid.');
        }
        if (onsale === null || onsale === undefined) {
            throw new Error('Required parameter onsale was null or undefined when calling updateTicketByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (storeId !== undefined && storeId !== null) {
            queryParameters = queryParameters.set('store_id', <any>storeId);
        }
        if (productPromotionId !== undefined && productPromotionId !== null) {
            queryParameters = queryParameters.set('product_promotion_id', <any>productPromotionId);
        }
        if (code !== undefined && code !== null) {
            queryParameters = queryParameters.set('code', <any>code);
        }
        if (sku !== undefined && sku !== null) {
            queryParameters = queryParameters.set('sku', <any>sku);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (imgpath !== undefined && imgpath !== null) {
            queryParameters = queryParameters.set('imgpath', <any>imgpath);
        }
        if (price !== undefined && price !== null) {
            queryParameters = queryParameters.set('price', <any>price);
        }
        if (qty !== undefined && qty !== null) {
            queryParameters = queryParameters.set('qty', <any>qty);
        }
        if (stockthreshold !== undefined && stockthreshold !== null) {
            queryParameters = queryParameters.set('stockthreshold', <any>stockthreshold);
        }
        if (enddate !== undefined && enddate !== null) {
            queryParameters = queryParameters.set('enddate', <any>enddate);
        }
        if (onsale !== undefined && onsale !== null) {
            queryParameters = queryParameters.set('onsale', <any>onsale);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.put<any>(`${this.configuration.basePath}/api/ticket/${encodeURIComponent(String(uid))}`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
