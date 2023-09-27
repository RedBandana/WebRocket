import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';

@Injectable({
    providedIn: 'root'
})

export class RequestService {
    private API_BASE = 'http://127.0.0.1:3000';
    constructor(
        private apiService: ApiService
    ) { }

    async createRequest(request: any) {
        try {
            const source$ = this.apiService.postData(`${this.API_BASE}/requests`, request).pipe();
            const response = await lastValueFrom(source$);
            console.log(response);
            return response;

        }
        catch (error) {
            console.error('An error occurred:', error);
            return error;
        }
    }
}
