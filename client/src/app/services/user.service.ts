import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/core/http/api.service';
import * as actions from '../actions/user.actions';
import { User } from '../models/user.model';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private API_BASE = 'https://myapi.com';
    constructor(
        private http: HttpClient,
        private apiService: ApiService
    ) { }

    getUsers() {
        return this.apiService.postData(`apiUrl/request`, null);
    }
}
