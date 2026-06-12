import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private storageService: StorageService) {}

  getExpenses() {
    const data = this.storageService.getData();
    return data.expenses;
  }

  addExpense(expense: any) {
    const data = this.storageService.getData();
    data.expenses.push(expense);
    this.storageService.saveData(data);
  }

  deleteExpense(id: string) {
    const data = this.storageService.getData();
    data.expenses = data.expenses.filter((expense: any) => expense.id !== id);
    this.storageService.saveData(data);
  }

  getExpenseByGroup(groupId: string) {
    const data = this.storageService.getData();
    return data.expenses.filter((expense: any) => expense.groupId === groupId);
  }

  addSettlement(settlement: any) {
    const data = this.storageService.getData();
    data.settlements.push(settlement);
    this.storageService.saveData(data);
  }

  getSettlements() {
    const data = this.storageService.getData();
    return data.settlements;
  }
}
