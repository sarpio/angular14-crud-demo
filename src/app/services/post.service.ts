import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, ObservedValueOf, retry, throwError } from "rxjs";
import { PostModel } from "../model/post-model";

@Injectable({
    providedIn: 'root'
})
export class PostService {

    postUrl: string = 'https://jsonplaceholder.typicode.com/posts';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }


    constructor(private http: HttpClient) {
    }

    getAll(): Observable<any> {
        return this.http.get(this.postUrl)
            .pipe(catchError(this.errorHandler));
    }

    create(post: PostModel): Observable<any> {
        return this.http.post(this.postUrl, JSON.stringify(post), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    findById(id: string): Observable<any> {
        return this.http.get(this.postUrl + '/' + id, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    deletePost(id: number): Observable<any> {
        return this.http.delete(this.postUrl + '/' + id, this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandler));
    }
    //
    updatePost(id: number, data: PostModel): Observable<any> {
        return this.http.put(this.postUrl + '/' + id, JSON.stringify(data), this.httpOptions)
            .pipe(retry(1), catchError(this.errorHandler));
    }

    errorHandler(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return errorMessage;
    }
}
