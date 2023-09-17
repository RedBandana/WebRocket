import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(private http: HttpClient) { }

    getData(url: string): Observable<any> {
        return this.http.get(url).pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    postData(url: string, data: any): Observable<any> {
        return this.http.post(url, data).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred
            console.error('An error occurred:', error.error.message);
        } else {
            // Backend returned an unsuccessful response code.
            console.error(`Server returned code: ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(() => 'Something went wrong. Please try again.');
    }
}
