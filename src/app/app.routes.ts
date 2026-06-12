import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/dashboard';
import { GroupList } from './features/groups/group-list/group-list';
import { GroupForm } from './features/groups/group-form/group-form';
import { GroupDetails } from './features/groups/group-details/group-details';
import { ExpenseList } from './features/expenses/expense-list/expense-list';
import { ExpenseForm } from './features/expenses/expense-form/expense-form';
import { Balances } from './features/balances/balances';
import { SettleUp } from './features/settelments/settle-up/settle-up';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: Dashboard,
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
