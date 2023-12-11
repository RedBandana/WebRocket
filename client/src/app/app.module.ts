import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/http/api.service';
import { RequestModule } from './modules/request/request.module';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './modules/terms-of-use/terms-of-use.component';

// Factory function for HttpLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    TermsOfUseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RequestModule,
    UserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
