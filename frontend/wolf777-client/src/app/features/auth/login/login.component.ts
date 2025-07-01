import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;
  returnUrl: string = '/';
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // Initialize form with validation
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
    
    // Check if already logged in
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    // Try to get stored returnUrl from session storage (set by auth guard)
    const storedUrl = sessionStorage.getItem('redirectUrl');
    if (storedUrl) {
      this.returnUrl = storedUrl;
      sessionStorage.removeItem('redirectUrl');
    }
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.error = '';

    const { username, password, rememberMe } = this.loginForm.value;

    this.authService.login({ username, password })
      .subscribe({
        next: () => {
          // Display welcome message
          this.snackBar.open('Login successful, welcome back!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
          
          // Navigate to return url
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          this.error = error.message || 'Invalid username or password';
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

  // Navigate to register page
  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  // Navigate to forgot password page
  navigateToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
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