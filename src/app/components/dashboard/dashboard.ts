import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { GroupService } from '../../core/services/group.service';
import { ExpenseService } from '../../core/services/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  totalGroups = 0;
  totalExpenses = 0;
  totalSettlements = 0;
  totalOutstanding = 0;

  constructor(
    private groupService: GroupService,
    private expenseService: ExpenseService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.totalGroups = this.groupService.getGroups().length;
    this.totalExpenses = this.expenseService.getExpenses().length;
    this.totalSettlements = this.expenseService.getSettlements().length;
    const balances = this.expenseService.calculateBalances();
    this.totalOutstanding = balances.reduce((sum, balance) => sum + balance.amount, 0);
  }

  navigateToGroups() {
    this.router.navigate(['/groups']);
  }

  navigateToExpenses() {
    this.router.navigate(['/expenses']);
  }

  navigateToSettleup(){
     this.router.navigate(['/settle-up']);
  }
  
  navigateToBalance(){
     this.router.navigate(['/balances']);
  }
}
