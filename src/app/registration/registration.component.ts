// src/app/registration/registration.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(0)]],
      exactAge: [''] // Initializing exactAge form control
    });

    // Add a listener to reset exactAge if age is less than or equal to 18
    this.registrationForm.get('age')?.valueChanges.subscribe(value => {
      if (value <= 18) {
        this.registrationForm.get('exactAge')?.setValue('');
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form Submitted', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
