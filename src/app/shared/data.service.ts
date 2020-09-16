import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    private baseUrl = "https://6abei0a5ie.execute-api.us-east-2.amazonaws.com/dev";

    constructor(private httpClient: HttpClient) { }

    public post(url: string, reqObj: any) {

        const apiUrl = this.baseUrl + url;
        return this.httpClient.post(apiUrl, reqObj, this.httpOptions);
    }

    upload(URL, reqObj: any) {

        const apiUrl = this.baseUrl + URL;

        return this.httpClient.post(`${apiUrl}`, reqObj, {
            reportProgress: true,
            observe: 'events'
        });

    }

    // upload(URL, formData: FormData) {

    // const req = new HttpRequest('POST', `${URL}`, formData, {
    //     reportProgress: true,
    //     responseType: 'json'
    // });

    // return this.httpClient.request(req);
    // : Observable<HttpEvent<any>>

    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'multipart/form-data'
    //         })
    //     };

    //     return this.httpClient.post(URL, formData, httpOptions);
    // }

}