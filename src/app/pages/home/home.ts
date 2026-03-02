import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  loginErrorMessage = '';
  userForm = new FormGroup({
  });

  private readonly _router = inject(Router);

  login() {
    this._router.navigate(['/products']);
  }
}
