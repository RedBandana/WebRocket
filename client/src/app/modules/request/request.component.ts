import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { startCreateRequest } from '../../actions/request.actions';
import { RequestState } from '../../states/request.state';
import { User } from 'src/app/models/user.model';
import { UserState } from 'src/app/states/user.state';
import { Request } from 'src/app/models/request.model';
import { startGetUser } from 'src/app/actions/user.actions';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

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
  errorMessage: string = '';

  selectedLanguage: string = 'en';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<{ user: UserState, request: RequestState }>,
    private location: Location,
    private router: Router,
    private translate: TranslateService
  ) {

    translate.setDefaultLang('en');

    const queryParams = new URLSearchParams(window.location.search);
    const lang = queryParams.get('lang') ?? "en";
    this.translate.use(lang);

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
    this.route.queryParams.subscribe((params: Params) => {
      this.selectedLanguage = params['lang'] || 'en';
      this.translate.use(this.selectedLanguage);
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params['agent'] || '';
      if (this.userId) {
        this.store.dispatch(startGetUser({ userId: this.userId }));
      }
    });

    this.userSubscription = this.store.select(state => state.user)
      .subscribe(userState => {
        this.user = userState.user;
        this.userLoading = userState.loading;
        this.userError = userState.error;

        if (this.user && !this.userLoading && !this.userError) {
          // Perform actions as needed.
        }
      });

    this.requestSubscription = this.store.select(state => state.request)
      .subscribe(requestState => {
        this.request = requestState.request;
        this.requestLoading = requestState.loading;
        this.requestError = requestState.error;

        if (this.request && !this.requestLoading && !this.requestError) {
          // Perform actions as needed.
        }
      });
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

  changeLanguage(event: Event): void {
    const selectElement = event?.target as HTMLSelectElement; // Type assertion
    const lang = selectElement?.value ?? "en";

    // Change the language using URL query parameters
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('lang', lang);
    this.translate.use(lang);

    this.location.go(this.route.snapshot.routeConfig?.path ?? '', queryParams.toString());
  }

  goToPage(pageName: string): void {
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge', // Preserve current query params
      // ... potentially other navigation extras if needed
    };
    this.router.navigate([pageName], navigationExtras);
  }

  translateText(text: string): void {
    this.translate.get(text).subscribe((res: string) => {
      // translate in code
    });
  }
}