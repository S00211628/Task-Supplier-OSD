import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTextSubject = new BehaviorSubject<string>('');
  public searchText$ = this.searchTextSubject.asObservable();

  setSearchText(searchText:string){
    this.searchTextSubject.next(searchText);
  }
}
