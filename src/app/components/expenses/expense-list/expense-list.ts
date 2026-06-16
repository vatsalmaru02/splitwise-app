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

  getOwesText(expense: any): string[] {
    const owes: string[] = [];

    if (expense.splitType === 'even') {
      const share = Number((expense.amount / expense.participants.length).toFixed(2));

      expense.participants.forEach((participant: string) => {
        if (participant === expense.paidBy) {
          return;
        }
        owes.push(`${participant} owes ${expense.paidBy} ₹${share.toFixed(2)}`);
      });
    } else {
      expense.customSplits?.forEach((split: any) => {
        if (split.user === expense.paidBy) {
          return;
        }
        owes.push(`${split.user} owes ${expense.paidBy} ₹${Number(split.amount).toFixed(2)}`);
      });
    }
    return owes;
  }
}
