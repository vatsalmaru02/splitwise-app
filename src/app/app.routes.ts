import { Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard';
import { GroupList } from './components/groups/group-list/group-list';
import { GroupForm } from './components/groups/group-form/group-form';
import { GroupDetails } from './components/groups/group-details/group-details';
import { ExpenseList } from './components/expenses/expense-list/expense-list';
import { ExpenseForm } from './components/expenses/expense-form/expense-form';
import { Balances } from './components/balances/balances';
import { SettleUp } from './components/settelments/settle-up/settle-up';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'groups',
    component: GroupList,
  },
  {
    path: 'groups/new',
    component: GroupForm,
  },
  {
    path: 'groups/:id',
    component: GroupDetails,
  },
  {
    path: 'expenses',
    component: ExpenseList,
  },
  {
    path: 'expenses/new',
    component: ExpenseForm,
  },
  {
    path: 'balances',
    component: Balances,
  },
  {
    path: 'settle-up',
    component: SettleUp,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
