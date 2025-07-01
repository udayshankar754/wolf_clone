import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  resetSent = false;
  error: string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Initialize form with validation
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }
  
  // Getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }
  
  onSubmit(): void {
    this.submitted = true;
    
    // Stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    
    const { email } = this.forgotPasswordForm.value;

    this.authService.forgotPassword(email)
      .subscribe({
        next: () => {
          this.resetSent = true;
          this.loading = false;
          
          // Display success message
          this.snackBar.open('Password reset instructions sent to your email', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        },
        error: (error) => {
          this.error = error.message || 'Error processing your request. Please try again.';
          this.loading = false;
          
          // Show error in snack bar
          this.snackBar.open(this.error, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'],
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      });
  }
  
  // Navigate back to login page
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}