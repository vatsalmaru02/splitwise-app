import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Group } from '../../../core/models/group.model';

import { GroupService } from '../../../core/services/group.service';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss',
})
export class ExpenseForm implements OnInit {
  group!: Group;

  form!: FormGroup;
  customSplits: { user: string; amount: number }[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private expenseService: ExpenseService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const groupId = this.route.snapshot.queryParamMap.get('groupId');

    if (!groupId) {
      this.router.navigate(['/groups']);
      return;
    }

    const group = this.groupService.getGroupById(groupId);

    if (!group) {
      this.router.navigate(['/groups']);
      return;
    }

    this.group = group;

    this.initializeForm();
  }

  initializeForm() {
    this.form = this.fb.group({
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      paidBy: ['', Validators.required],
      participants: [[], Validators.required],
      splitType: ['even'],
    });

    this.form.get('participants')?.valueChanges.subscribe((participants) => {
      this.customSplits = (participants || []).map((participant: string) => ({
        user: participant,
        amount: 0,
      }));
    });
  }

  saveExpense() {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
      this.form.markAllAsTouched();
      return;
    }

    const participants = this.form.value.participants || [];

    if (participants.length === 0) {
      this.snackBar.open('Select at least one participant', 'Close', {
        duration: 3000,
      });
      return;
    }

    if (this.form.value.splitType === 'custom') {
      const totalCustomAmount = this.customSplits.reduce(
        (sum, item) => sum + Number(item.amount),
        0,
      );

      if (totalCustomAmount !== Number(this.form.value.amount)) {
        this.snackBar.open('Custom split total must equal expense amount', 'Close', {
          duration: 3000,
        });

        return;
      }
    }

    const expense = {
      id: Date.now().toString(),
      groupId: this.group.id,
      description: this.form.value.description,
      amount: Number(this.form.value.amount),
      paidBy: this.form.value.paidBy,
      participants,
      splitType: this.form.value.splitType,
      customSplits: this.form.value.splitType === 'custom' ? this.customSplits : [],
    };

    this.expenseService.addExpense(expense);

    this.snackBar.open('Expense added successfully', 'Close', {
      duration: 3000,
    });

    this.router.navigate(['/groups', this.group.id]);
  }

  updateCustomAmount(user: string, value: string) {
    const split = this.customSplits.find((item) => item.user === user);

    if (split) {
      split.amount = Number(value);
    }
  }
}
