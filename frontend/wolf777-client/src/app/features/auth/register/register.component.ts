import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Create the registration form with validators
    this.registerForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z0-9._-]+$')]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required],
      country: ['India', Validators.required],
      currency: ['INR', Validators.required],
      agreeTerms: [false, Validators.requiredTrue],
      age18Plus: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
    
    // Check if already logged in
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
  }

  // Getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // Custom validator for password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
    
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    
    return !passwordValid ? { passwordStrength: true } : null;
  }

  // Custom validator for password matching
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    // Stop here if form is invalid
    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.loading = true;
    this.error = '';

    const {
      fullName,
      username,
      email,
      mobile,
      password,
      country,
      currency
    } = this.registerForm.value;

    const registerData = {
      name: fullName,
      username,
      email,
      mobile,
      password,
      country,
      currency
    };

    this.authService.register(registerData)
      .subscribe({
        next: (user) => {
          // Show success message
          this.snackBar.open('Registration successful! Welcome to Wolf777', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          
          // Navigate to home or verification page
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error.message || 'Registration failed. Please try again.';
          this.loading = false;
          
          // Show error message
          this.snackBar.open(this.error, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }

  // Navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  // Helper method to mark all controls in a form group as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}