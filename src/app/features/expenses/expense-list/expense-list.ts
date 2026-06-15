import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Expense } from '../../../core/models/expense.model';

import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.scss',
})
export class ExpenseList implements OnInit {
  expenses: Expense[] = [];

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenses = this.expenseService.getExpenses();
  }

  deleteExpense(id: string) {
    this.expenseService.deleteExpense(id);
    this.loadExpenses();
  }

  addExpense() {
    this.router.navigate(['/groups']);
  }
}
