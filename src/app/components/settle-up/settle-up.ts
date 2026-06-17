import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-settle-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './settle-up.html',
  styleUrl: './settle-up.scss',
})
export class SettleUp implements OnInit {
  balances: any[] = [];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromUserId: ['', Validators.required],
      toUserId: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
    });

    this.balances = this.expenseService.calculateBalances();
  }

  settle() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    if (
      this.form.value.fromUserId?.trim().toLowerCase() ===
      this.form.value.toUserId?.trim().toLowerCase()
    ) {
      this.snackBar.open('From User and To User cannot be the same', 'Close', {
        duration: 3000,
      });

      return;
    }
    const amount = Number(this.form.value.amount);

    const balance = this.balances.find(
      (b) =>
        b.fromUserId?.trim().toLowerCase() === this.form.value.fromUserId?.trim().toLowerCase() &&
        b.toUserId?.trim().toLowerCase() === this.form.value.toUserId?.trim().toLowerCase(),
    );

    if (!balance) {
      this.snackBar.open('No balance found', 'Close', {
        duration: 3000,
      });

      return;
    }

    if (amount > balance.amount) {
      this.snackBar.open(`Maximum amount allowed is ₹${balance.amount}`, 'Close', {
        duration: 3000,
      });

      return;
    }

    const settlement = {
      id: Date.now().toString(),
      groupId: '',
      fromUserId: this.form.value.fromUserId,
      toUserId: this.form.value.toUserId,
      amount,
    };

    this.expenseService.addSettlement(settlement);

    this.balances = this.expenseService.calculateBalances();

    this.form.reset({
      fromUserId: '',
      toUserId: '',
      amount: 0,
    });

    this.snackBar.open('Settlement added successfully', 'Close', {
      duration: 3000,
    });
  }
}
