import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';

@Injectable({
    providedIn: 'root'
})

export class RequestService {
    private API_BASE = 'http://127.0.0.1:3000';
    constructor(
        private apiService: ApiService
    ) { }

    createRequest(request: any) {
        return this.apiService.postData(`${this.API_BASE}/requests`, request);
    }
}
