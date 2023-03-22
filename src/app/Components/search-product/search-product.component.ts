import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchProductService } from 'src/app/Services/search-product.service';
import { SearchService } from 'src/app/Services/search.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss'],
})
export class SearchProductComponent implements OnInit {
  enteredSearchValue: string = '';

  @Output()
  searchProductTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _searchService: SearchService, private _searchProductService: SearchProductService) {}

  ngOnInit(): void {}

  onSearchProductTextChanged() {
    console.log("should be here");
    this._searchProductService.setSearchProductText(this.enteredSearchValue);
    this.searchProductTextChanged.emit(this.enteredSearchValue);
  }

  clearSearch() {
    this.enteredSearchValue = '';
    this._searchProductService.setSearchProductText('');
    this.searchProductTextChanged.emit('');
  }
}
