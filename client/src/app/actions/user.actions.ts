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