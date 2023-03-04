import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _searchService:SearchService) {}

  ngOnInit(): void {}

  onSearchTextChanged() {
    this._searchService.setSearchText(this.enteredSearchValue);
  }

  clearSearch(){
    this.enteredSearchValue = '';
    this._searchService.setSearchText('');
  }
}
