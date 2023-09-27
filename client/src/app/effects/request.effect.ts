import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { RequestService } from '../services/request.service';
import * as RequestActions from '../actions/request.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Request } from '../models/request.model';

@Injectable()
export class RequestEffects {

  createRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RequestActions.startCreateRequest),
      mergeMap((action) =>
        from(this.requestService.createRequest(action.request)).pipe(
          map((payload: Request) => RequestActions.createRequestSuccess({ request: payload })),
          catchError((error) => of(RequestActions.createRequestFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private requestService: RequestService) { }
}