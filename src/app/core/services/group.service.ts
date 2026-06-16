import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Group } from '../models/group.model';
import { Expense } from '../models/expense.model';
import { Settlement } from '../models/settlement.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private storageService: StorageService) {}

  getGroups() {
    const data = this.storageService.getData();
    return data.groups;
  }

  addGroup(group: Group) {
    const data = this.storageService.getData();
    data.groups.push(group);
    this.storageService.saveData(data);
  }

  deleteGroup(id: string) {
    const data = this.storageService.getData();
    data.groups = data.groups.filter((group: Group) => group.id !== id);
    data.expenses = data.expenses.filter((expense: Expense) => expense.groupId !== id);
    data.settlements = data.settlements.filter((settlement: any) => settlement.groupId !== id);
    this.storageService.saveData(data);
  }

  getGroupById(id: string) {
    const data = this.storageService.getData();
    return data.groups.find((group: Group) => group.id === id);
  }
}
