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
export class VideoControllerServiceService {

    protected basePath = 'http://172.104.45.205';
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
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Creates a video.
     * @param channel_id Video belongs To which Channel
     * @param title Video title
     * @param scope Is this video public?
     * @param videopath Video Link
     * @param videopublicid Video Link
     * @param totallength Length Of Video
     * @param free Is this video free?
     * @param discbyprice Is this video discount by price?
     * @param desc Video description
     * @param price Video Price
     * @param disc Discount Price
     * @param discpctg Discount Percentage
     * @param img Video Cover Image
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createVideo(channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, img?: Array<Blob>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createVideo(channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, img?: Array<Blob>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createVideo(channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, img?: Array<Blob>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createVideo(channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, img?: Array<Blob>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (channel_id === null || channel_id === undefined) {
            throw new Error('Required parameter channel_id was null or undefined when calling createVideo.');
        }
        if (title === null || title === undefined) {
            throw new Error('Required parameter title was null or undefined when calling createVideo.');
        }
        if (scope === null || scope === undefined) {
            throw new Error('Required parameter scope was null or undefined when calling createVideo.');
        }
        if (videopath === null || videopath === undefined) {
            throw new Error('Required parameter videopath was null or undefined when calling createVideo.');
        }
        if (videopublicid === null || videopublicid === undefined) {
            throw new Error('Required parameter videopublicid was null or undefined when calling createVideo.');
        }
        if (totallength === null || totallength === undefined) {
            throw new Error('Required parameter totallength was null or undefined when calling createVideo.');
        }
        if (free === null || free === undefined) {
            throw new Error('Required parameter free was null or undefined when calling createVideo.');
        }
        if (discbyprice === null || discbyprice === undefined) {
            throw new Error('Required parameter discbyprice was null or undefined when calling createVideo.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (channel_id !== undefined && channel_id !== null) {
            queryParameters = queryParameters.set('channel_id', <any>channel_id);
        }
        if (title !== undefined && title !== null) {
            queryParameters = queryParameters.set('title', <any>title);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (scope !== undefined && scope !== null) {
            queryParameters = queryParameters.set('scope', <any>scope);
        }
        if (videopath !== undefined && videopath !== null) {
            queryParameters = queryParameters.set('videopath', <any>videopath);
        }
        if (videopublicid !== undefined && videopublicid !== null) {
            queryParameters = queryParameters.set('videopublicid', <any>videopublicid);
        }
        if (totallength !== undefined && totallength !== null) {
            queryParameters = queryParameters.set('totallength', <any>totallength);
        }
        if (free !== undefined && free !== null) {
            queryParameters = queryParameters.set('free', <any>free);
        }
        if (price !== undefined && price !== null) {
            queryParameters = queryParameters.set('price', <any>price);
        }
        if (discbyprice !== undefined && discbyprice !== null) {
            queryParameters = queryParameters.set('discbyprice', <any>discbyprice);
        }
        if (disc !== undefined && disc !== null) {
            queryParameters = queryParameters.set('disc', <any>disc);
        }
        if (discpctg !== undefined && discpctg !== null) {
            queryParameters = queryParameters.set('discpctg', <any>discpctg);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: this.encoder});
        }

        if (img) {
            if (useForm) {
                img.forEach((element) => {
                    formParams = formParams.append('img', <any>element) as any || formParams;
            })
            } else {
                formParams = formParams.append('img', img.join(COLLECTION_FORMATS['csv'])) as any || formParams;
            }
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/api/video`,
            convertFormParamsToString ? formParams.toString() : formParams,
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
     * Set video\&#39;s \&#39;status\&#39; to 0.
     * @param uid Video ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteVideoByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteVideoByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteVideoByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteVideoByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling deleteVideoByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.delete<any>(`${this.configuration.basePath}/api/video/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Filter list of videos
     * Returns list of filtered videos
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param keyword Keyword for filter
     * @param fromdate From Date for filter
     * @param todate To string for filter
     * @param status status for filter
     * @param company_id Company id for filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public filterVideos(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public filterVideos(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public filterVideos(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public filterVideos(page_number?: number, page_size?: number, keyword?: string, fromdate?: string, todate?: string, status?: string, company_id?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page_number !== undefined && page_number !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>page_number);
        }
        if (page_size !== undefined && page_size !== null) {
            queryParameters = queryParameters.set('pageSize', <any>page_size);
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
        if (status !== undefined && status !== null) {
            queryParameters = queryParameters.set('status', <any>status);
        }
        if (company_id !== undefined && company_id !== null) {
            queryParameters = queryParameters.set('company_id', <any>company_id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/filter/video`,
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
     * Retrieves public video by Uid.
     * @param uid Video ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPublicVideoByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPublicVideoByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPublicVideoByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPublicVideoByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getPublicVideoByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/public/video/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves all public comments.
     * @param uid Video ID, NOT \&#39;ID\&#39;.
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPublicVideoComments(uid: string, page_number?: number, page_size?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPublicVideoComments(uid: string, page_number?: number, page_size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPublicVideoComments(uid: string, page_number?: number, page_size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPublicVideoComments(uid: string, page_number?: number, page_size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getPublicVideoComments.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page_number !== undefined && page_number !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>page_number);
        }
        if (page_size !== undefined && page_size !== null) {
            queryParameters = queryParameters.set('pageSize', <any>page_size);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/public/video/${encodeURIComponent(String(uid))}/comments`,
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
     * Retrieves all public videos.
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPublicVideos(page_number?: number, page_size?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getPublicVideos(page_number?: number, page_size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getPublicVideos(page_number?: number, page_size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getPublicVideos(page_number?: number, page_size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page_number !== undefined && page_number !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>page_number);
        }
        if (page_size !== undefined && page_size !== null) {
            queryParameters = queryParameters.set('pageSize', <any>page_size);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/public/videos`,
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
     * Retrieves video by Uid.
     * @param uid Video_ID, NOT \&#39;ID\&#39;.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVideoByUid(uid: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getVideoByUid(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getVideoByUid(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getVideoByUid(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling getVideoByUid.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/video/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get list of videos
     * Returns list of videos
     * @param page_number Page number
     * @param page_size number of pageSize
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getVideos(page_number?: number, page_size?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getVideos(page_number?: number, page_size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getVideos(page_number?: number, page_size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getVideos(page_number?: number, page_size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (page_number !== undefined && page_number !== null) {
            queryParameters = queryParameters.set('pageNumber', <any>page_number);
        }
        if (page_size !== undefined && page_size !== null) {
            queryParameters = queryParameters.set('pageSize', <any>page_size);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<any>(`${this.configuration.basePath}/api/video`,
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
     * Set like for video
     * @param video_id Video id
     * @param type Like or dislike
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setVideoLikeById(video_id: number, type: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public setVideoLikeById(video_id: number, type: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public setVideoLikeById(video_id: number, type: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public setVideoLikeById(video_id: number, type: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (video_id === null || video_id === undefined) {
            throw new Error('Required parameter video_id was null or undefined when calling setVideoLikeById.');
        }
        if (type === null || type === undefined) {
            throw new Error('Required parameter type was null or undefined when calling setVideoLikeById.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (video_id !== undefined && video_id !== null) {
            queryParameters = queryParameters.set('video_id', <any>video_id);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('type', <any>type);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.post<any>(`${this.configuration.basePath}/api/public/video/like/edit`,
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
     * Update video by Uid.
     * @param uid Video_ID, NOT \&#39;ID\&#39;.
     * @param channel_id Video belongs To which Channel
     * @param title Video title
     * @param scope Is this video public?
     * @param videopath Video Link
     * @param videopublicid Video ID
     * @param totallength Length Of Video
     * @param free Is this video free?
     * @param discbyprice Is this video discount by price?
     * @param desc Video description
     * @param price Video Price
     * @param disc Discount Price
     * @param discpctg Discount Percentage
     * @param _method For spoofing purposes.
     * @param img Video Cover Image
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateVideoByUid(uid: string, channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, _method?: string, img?: Array<Blob>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateVideoByUid(uid: string, channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, _method?: string, img?: Array<Blob>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateVideoByUid(uid: string, channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, _method?: string, img?: Array<Blob>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateVideoByUid(uid: string, channel_id: number, title: string, scope: string, videopath: string, videopublicid: string, totallength: string, free: number, discbyprice: number, desc?: string, price?: number, disc?: number, discpctg?: number, _method?: string, img?: Array<Blob>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling updateVideoByUid.');
        }
        if (channel_id === null || channel_id === undefined) {
            throw new Error('Required parameter channel_id was null or undefined when calling updateVideoByUid.');
        }
        if (title === null || title === undefined) {
            throw new Error('Required parameter title was null or undefined when calling updateVideoByUid.');
        }
        if (scope === null || scope === undefined) {
            throw new Error('Required parameter scope was null or undefined when calling updateVideoByUid.');
        }
        if (videopath === null || videopath === undefined) {
            throw new Error('Required parameter videopath was null or undefined when calling updateVideoByUid.');
        }
        if (videopublicid === null || videopublicid === undefined) {
            throw new Error('Required parameter videopublicid was null or undefined when calling updateVideoByUid.');
        }
        if (totallength === null || totallength === undefined) {
            throw new Error('Required parameter totallength was null or undefined when calling updateVideoByUid.');
        }
        if (free === null || free === undefined) {
            throw new Error('Required parameter free was null or undefined when calling updateVideoByUid.');
        }
        if (discbyprice === null || discbyprice === undefined) {
            throw new Error('Required parameter discbyprice was null or undefined when calling updateVideoByUid.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (channel_id !== undefined && channel_id !== null) {
            queryParameters = queryParameters.set('channel_id', <any>channel_id);
        }
        if (title !== undefined && title !== null) {
            queryParameters = queryParameters.set('title', <any>title);
        }
        if (desc !== undefined && desc !== null) {
            queryParameters = queryParameters.set('desc', <any>desc);
        }
        if (scope !== undefined && scope !== null) {
            queryParameters = queryParameters.set('scope', <any>scope);
        }
        if (videopath !== undefined && videopath !== null) {
            queryParameters = queryParameters.set('videopath', <any>videopath);
        }
        if (videopublicid !== undefined && videopublicid !== null) {
            queryParameters = queryParameters.set('videopublicid', <any>videopublicid);
        }
        if (totallength !== undefined && totallength !== null) {
            queryParameters = queryParameters.set('totallength', <any>totallength);
        }
        if (free !== undefined && free !== null) {
            queryParameters = queryParameters.set('free', <any>free);
        }
        if (price !== undefined && price !== null) {
            queryParameters = queryParameters.set('price', <any>price);
        }
        if (discbyprice !== undefined && discbyprice !== null) {
            queryParameters = queryParameters.set('discbyprice', <any>discbyprice);
        }
        if (disc !== undefined && disc !== null) {
            queryParameters = queryParameters.set('disc', <any>disc);
        }
        if (discpctg !== undefined && discpctg !== null) {
            queryParameters = queryParameters.set('discpctg', <any>discpctg);
        }
        if (_method !== undefined && _method !== null) {
            queryParameters = queryParameters.set('_method', <any>_method);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): any; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: this.encoder});
        }

        if (img) {
            if (useForm) {
                img.forEach((element) => {
                    formParams = formParams.append('img', <any>element) as any || formParams;
            })
            } else {
                formParams = formParams.append('img', img.join(COLLECTION_FORMATS['csv'])) as any || formParams;
            }
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/api/video/${encodeURIComponent(String(uid))}`,
            convertFormParamsToString ? formParams.toString() : formParams,
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
