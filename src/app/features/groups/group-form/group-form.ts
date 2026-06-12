import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { GroupService } from '../../../core/services/group.service';

@Component({
  selector: 'app-group-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './group-form.html',
  styleUrl: './group-form.scss',
})
export class GroupForm implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      members: this.fb.array([]),
    });
  }

  get members(): FormArray {
    return this.form.get('members') as FormArray;
  }

  addMember() {
    this.members.push(this.fb.control('', Validators.required));
  }

  removeMember(index: number) {
    this.members.removeAt(index);
  }

  saveGroup() {
    const members = this.members.value.filter((member: string) => member?.trim());

    if (members.length < 2) {
      this.snackBar.open('Minimum 2 members required', 'Close', {
        duration: 3000,
      });
      return;
    }

    const uniqueMembers = new Set(members.map((member: string) => member.trim().toLowerCase()));

    if (uniqueMembers.size !== members.length) {
      this.snackBar.open('Duplicate members are not allowed', 'Close', {
        duration: 3000,
      });
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const group = {
      id: Date.now().toString(),
      name: this.form.value.name,
      members: this.members.value,
    };

    this.groupService.addGroup(group);
    this.router.navigate(['/groups']);
  }
}
