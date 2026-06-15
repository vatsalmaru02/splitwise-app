import { Component, OnInit } from '@angular/core';
import { Group } from '../../../core/models/group.model';
import { GroupService } from '../../../core/services/group.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog';

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
    private dialog: MatDialog,
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '32rem',
      data: {
        title: 'Delete Group',
        message: 'Are you sure you want to delete this group and all related expenses?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      this.groupService.deleteGroup(id);
      this.loadGroups();
    });
  }
}
