import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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

export class RequestComponent implements OnInit, OnDestroy {
  user?: User;
  userError: any = null;
  userLoading: boolean = false;
  private userSubscription!: Subscription;

  request?: Request;
  requestError: any = null;
  requestLoading: boolean = false;
  private requestSubscription!: Subscription;

  requestForm: FormGroup;
  userId: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<{ user: UserState, request: RequestState }>
  ) {

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
    this.userSubscription = this.store.select(state => state.user)
      .subscribe(userState => {
        this.user = userState.user;
        this.userLoading = userState.loading;
        this.userError = userState.error;
      });

    this.requestSubscription = this.store.select(state => state.request)
      .subscribe(requestState => {
        this.request = requestState.request;
        this.requestLoading = requestState.loading;
        this.requestError = requestState.error;
      });

    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    if (this.userId !== '') {
      this.store.dispatch(startGetUser({ userId: this.userId }));
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.requestSubscription.unsubscribe();
  }

  join(): void {
    if (this.requestForm.invalid) {
      this.errorMessage = 'Form is invalid.';
      return;
    }
    this.errorMessage = '';

    const request: any = {
      agentId: this.userId,
      firstName: this.requestForm.value.firstName,
      lastName: this.requestForm.value.lastName,
      email: this.requestForm.value.email,
      phone: this.requestForm.value.phone,
      mainInterest: this.requestForm.value.mainInterest,
      introducedBy: this.requestForm.value.introducedBy
    };

    if (request.agentId === '') {
      delete request.agentId;
    }

    this.store.dispatch(startCreateRequest({ request: request }));
  }
}