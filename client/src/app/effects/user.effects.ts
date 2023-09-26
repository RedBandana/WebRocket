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
          map((users) => UserActions.getUsersSuccess({ users: users as User[] })),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}