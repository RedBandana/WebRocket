import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startCreateRequest } from '../../actions/request.actions';
import { RequestState } from '../../states/request.state';
import { User } from 'src/app/models/user.model';
import { UserState } from 'src/app/states/user.state';
import { Request } from 'src/app/models/request.model';
import { startGetUser } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit {
  user$: Observable<User | undefined>;
  userLoading$: Observable<boolean>;
  userError$: Observable<any>;

  request$: Observable<Request | undefined>;
  requestLoading$: Observable<boolean>;
  requestError$: Observable<any>;

  requestForm: FormGroup;
  userId: string = '';
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<{ user: UserState, request: RequestState }>
  ) {
    this.user$ = store.select((state) => state.user.user);
    this.userLoading$ = store.select((state) => state.user.loading);
    this.userError$ = store.select((state) => state.user.error);

    this.request$ = store.select((state) => state.request.request);
    this.requestLoading$ = store.select((state) => state.request.loading);
    this.requestError$ = store.select((state) => state.request.error);

    this.requestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      mainInterest: ['', Validators.required],
      introducedBy: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    if (this.userId !== '') {
      this.store.dispatch(startGetUser({ userId: this.userId }));
    }
  }

  join(): void {
    if (this.requestForm.invalid) {
      this.errorMessage = 'Form is invalid.'
      return;
    }

    this.loading = true;

    const request = {
      agentId: this.userId,
      firstName: this.requestForm.value.firstName,
      lastName: this.requestForm.value.lastName,
      email: this.requestForm.value.email,
      phone: this.requestForm.value.phone,
      mainInterest: this.requestForm.value.mainInterest,
      introducedBy: this.requestForm.value.introducedBy
    };

    this.store.dispatch(startCreateRequest({ request: request}));
  }
}