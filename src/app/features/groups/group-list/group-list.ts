import { Component, OnInit } from '@angular/core';
import { Group } from '../../../core/models/group.model';
import { GroupService } from '../../../core/services/group.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-list',
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './group-list.html',
  styleUrl: './group-list.scss',
})
export class GroupList implements OnInit {
  groups: Group[] = [];

  constructor(
    private groupService: GroupService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.groups = this.groupService.getGroups();
  }

  createGroup() {
    this.router.navigate(['/groups/new']);
  }

  deleteGroup(id: string) {
    const confirmed = confirm('Are you sure you want to delete this group?');

    if (!confirmed) {
      return;
    }

    this.groupService.deleteGroup(id);
    this.loadGroups();
    this.snackBar.open('Group deleted successfully', 'Close', { duration: 3000 });
  }
}
