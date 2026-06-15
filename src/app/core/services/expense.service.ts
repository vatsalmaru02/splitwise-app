import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { share } from 'rxjs';

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

  getExpensesByGroup(groupId: string) {
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

  calculateBalances() {
    const expenses = this.getExpenses();
    const settlements = this.getSettlements();
    const balances: any[] = [];

    expenses.forEach((expense: any) => {
      if (expense.splitType === 'even') {
        const share = Number((expense.amount / expense.participants.length).toFixed(2));

        expense.participants.forEach((participant: string) => {
          if (participant === expense.paidBy) {
            return;
          }

          const existingBalance = balances.find(
            (balance) => balance.fromUserId === participant && balance.toUserId === expense.paidBy,
          );

          if (existingBalance) {
            existingBalance.amount = Number((existingBalance.amount + share).toFixed(2));
          } else {
            balances.push({
              fromUserId: participant,
              toUserId: expense.paidBy,
              amount: share,
            });
          }
        });
      } else {
        expense.customSplits.forEach((split: any) => {
          if (split.user === expense.paidBy) {
            return;
          }

          const existingBalance = balances.find(
            (balance) => balance.fromUserId === split.user && balance.toUserId === expense.paidBy,
          );

          if (existingBalance) {
            existingBalance.amount = Number((existingBalance.amount + share).toFixed(2));
          } else {
            balances.push({
              fromUserId: split.user,
              toUserId: expense.paidBy,
              amount: split.amount,
            });
          }
        });
      }
    });
    settlements.forEach((settlement: any) => {
      const balance = balances.find(
        (b) =>
          b.fromUserId?.trim().toLowerCase() === settlement.fromUserId?.trim().toLowerCase() &&
          b.toUserId?.trim().toLowerCase() === settlement.toUserId?.trim().toLowerCase(),
      );

      if (balance) {
        balance.amount = Number((balance.amount - settlement.amount).toFixed(2));
      }
    });

    return balances.filter((balance) => balance.amount > 0);
  }

  getNetBalances() {
    const balances = this.calculateBalances();
    const result: any = {};

    balances.forEach((balance: any) => {
      result[balance.fromUserId] = (result[balance.fromUserId] || 0) - balance.amount;
      result[balance.toUserId] = (result[balance.toUserId] || 0) + balance.amount;
    });

    return Object.entries(result).map(([user, amount]) => ({
      user,
      amount,
    }));
  }
}
