import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getData() {
    const data = localStorage.getItem('data');

    if (data) {
      return JSON.parse(data);
    }

    return {
      groups: [],
      expenses: [],
      settlements: [],
    };
  }

  saveData(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  clearData() {
    localStorage.removeItem('data');
  }
}
