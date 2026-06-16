import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Balance } from '../../core/models/balance.model';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-balances',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './balances.html',
  styleUrl: './balances.scss',
})
export class Balances implements OnInit {
  balances: Balance[] = [];
  netBalances: any[] = [];

  constructor(private expenseService: ExpenseService) {}
  ngOnInit(): void {
    this.balances = this.expenseService.calculateBalances();

    this.netBalances = this.expenseService.getNetBalances();
  }
}
