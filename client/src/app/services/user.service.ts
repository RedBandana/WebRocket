import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/http/api.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private API_BASE = 'http://127.0.0.1:3000';
    constructor(
        private apiService: ApiService
    ) { }

    getUsers() {
        return this.apiService.getData(`${this.API_BASE}/users`);
    }

    getUser(id: string) {
        return this.apiService.getData(`${this.API_BASE}/users/${id}`);
    }
}
