import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from '../actions/user.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.startGetUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((payload) => UserActions.getUsersSuccess({ users: payload as User[] })),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.startGetUser),
      mergeMap((action) =>
        this.userService.getUser(action.userId).pipe(
          map((payload) => UserActions.getUserSuccess({ user: payload as User })),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}