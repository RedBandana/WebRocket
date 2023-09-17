import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})

export class RequestComponent implements OnInit {
  requestForm: FormGroup;
  userId: string = '';
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private apiService: ApiService
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
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
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

    this.apiService.postData(`apiUrl/request`, request).subscribe({
      complete: () => {
        this.loading = false;
        this.successMessage = 'Request created successfully.';
        this.requestForm.reset();
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = 'Failed to create request. Please try again.';
        console.error(error);
      }
    });
  }

  clearMessage(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}