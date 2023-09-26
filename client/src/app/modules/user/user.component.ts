import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { startGetUsers } from '../../actions/user.actions';
import { UserState } from '../../states/user.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  constructor(private store: Store<{user: UserState}>) {
    this.users$ = store.select((state) => state.user.users);
    this.loading$ = store.select((state) => state.user.loading);
    this.error$ = store.select((state) => state.user.error);
  }

  ngOnInit() {
      this.store.dispatch(startGetUsers());
  }
}
