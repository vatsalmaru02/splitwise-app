import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { GroupService } from '../../core/services/group.service';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  totalGroups = 0;
  totalExpenses = 0;
  totalSettlements = 0;
  totalOutstanding = 0;

  constructor(
    private groupService: GroupService,
    private expenseService: ExpenseService,
  ) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates() {
    this.totalGroups = this.groupService.getGroups().length;
    this.totalExpenses = this.expenseService.getExpenses().length;
    this.totalSettlements = this.expenseService.getSettlements().length;
  }
}
