import { CustomSplit } from "./custom-split.model";

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitType: 'even' | 'custom';
  participants: string[];
  customSplits?: CustomSplit[];
  createdAt: string;
}
