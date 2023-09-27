import { createAction, props } from '@ngrx/store';
import { Request } from '../models/request.model';

export const startCreateRequest = createAction(
    '[Request API] Start Create Request',
    props<{ request: Request }>()
);

export const createRequestSuccess = createAction(
    '[Request API] Create Request Success',
    props<{ request: Request }>()
);

export const createRequestFailure = createAction(
    '[Request API] Create Request Failure',
    props<{ error: any }>()
);