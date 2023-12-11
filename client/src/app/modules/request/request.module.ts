import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from '../request/request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from 'src/app/effects/user.effects';
import { RequestEffects } from 'src/app/effects/request.effect';
import { requestReducer } from 'src/app/reducers/request.reducer';
import { userReducer } from 'src/app/reducers/user.reducer';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(), // Use forChild() in feature modules
    ReactiveFormsModule,
    StoreModule.forFeature('request', requestReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([RequestEffects, UserEffects]),
    FormsModule
  ]
})
export class RequestModule { }
