import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const startGetUsers = createAction(
    '[User API] Start Get Users'
);

export const getUsersSuccess = createAction(
    '[User API] Get Users Success',
    props<{ users: User[] }>()
);

export const getUsersFailure = createAction(
    '[User API] Get Users Failure',
    props<{ error: any }>()
);

export const startGetUser = createAction(
    '[User API] Start Get User',
    props<{ userId: string }>()
);

export const getUserSuccess = createAction(
    '[User API] Get User Success',
    props<{ user: User }>()
);

export const getUserFailure = createAction(
    '[User API] Get User Failure',
    props<{ error: any }>()
);