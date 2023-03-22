import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchProductService {
  constructor() {}

  private searchProductTextSubject = new BehaviorSubject<string>('');

  public searchProductText$ = this.searchProductTextSubject.asObservable();

  setSearchProductText(searchText: string) {
    console.log('Defo should be here');
    this.searchProductTextSubject.next(searchText);
  }
}
