import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from '../request/request.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class RequestModule { }
