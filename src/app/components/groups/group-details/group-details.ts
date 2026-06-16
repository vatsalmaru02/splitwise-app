import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';

import { Group } from '../../../core/models/group.model';
import { Expense } from '../../../core/models/expense.model';
import { Balance } from '../../../core/models/balance.model';

import { GroupService } from '../../../core/services/group.service';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatDividerModule],
  templateUrl: './group-details.html',
  styleUrl: './group-details.scss',
})
export class GroupDetails implements OnInit {
  group!: Group;
  expenses: Expense[] = [];
  balances: Balance[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private expenseService: ExpenseService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/groups']);
      return;
    }

    const group = this.groupService.getGroupById(id);

    if (!group) {
      this.router.navigate(['/groups']);
      return;
    }

    this.group = group;
    this.expenses = this.expenseService.getExpensesByGroup(this.group.id);

    const allBalances = this.expenseService.calculateBalances();

    this.balances = allBalances.filter(
      (balance: Balance) =>
        this.group.members.includes(balance.fromUserId) &&
        this.group.members.includes(balance.toUserId),
    );
  }

  addExpense() {
    this.router.navigate(['/expenses/new'], {
      queryParams: {
        groupId: this.group.id,
      },
    });
  }
}
