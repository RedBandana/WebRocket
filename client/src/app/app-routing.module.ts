import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './modules/request/request.component';
import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from './modules/terms-of-use/terms-of-use.component';

const routes: Routes = [
  { path: 'request', component: RequestComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-of-use', component: TermsOfUseComponent },
  { path: '', redirectTo: 'request', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
