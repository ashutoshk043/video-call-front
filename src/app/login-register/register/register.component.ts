import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registrationForm: FormGroup;
  showRegister:boolean = false
  @Output() sendDataToParent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        mobile: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10}$')],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        dob: ['', Validators.required],
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  // Custom validator to check if password and confirmPassword match
  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Data:', this.registrationForm.value);
      alert('Registration Successful!');
    } else {
      alert('Please fill out the form correctly!');
    }
  }

  goToLogin(){
    this.sendDataToParent.emit({login:true});
  }
}
