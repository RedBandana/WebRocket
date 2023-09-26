import { createReducer, on } from '@ngrx/store';
import { UserState } from '../states/user.state';
import * as UserActions from '../actions/user.actions';

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.startGetUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    error: null,
    users,
  })),

  on(UserActions.getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);