import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestComponent } from './modules/request/request.component';

const routes: Routes = [
  { path: 'request', component: RequestComponent },
  { path: 'request/:userId', component: RequestComponent },
  { path: '', redirectTo: 'request', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
