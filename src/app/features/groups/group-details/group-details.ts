import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';


import { Group } from '../../../core/models/group.model';
import { Expense } from '../../../core/models/expense.model';

import { GroupService } from '../../../core/services/group.service';
import { ExpenseService } from '../../../core/services/expense.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private expenseService: ExpenseService,
    private dialog: MatDialog,
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
    this.expenses = this.expenseService.getExpensesByGroup(id);
  }

  addExpense() {
    this.router.navigate(['/expenses/new'], {
      queryParams: {
        groupId: this.group.id,
      },
    });
  }
}
