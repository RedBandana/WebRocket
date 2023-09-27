import { createReducer, on } from '@ngrx/store';
import { RequestState } from '../states/request.state';
import * as RequestActions from '../actions/request.actions';

export const initialState: RequestState = {
  request: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(RequestActions.startCreateRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(RequestActions.createRequestSuccess, (state, { request }) => ({
    ...state,
    loading: false,
    error: null,
    request,
  })),

  on(RequestActions.createRequestFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);