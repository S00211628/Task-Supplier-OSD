import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((item) =>
      item.shop_name.toLowerCase().includes(searchText)
    );
  }
}

@NgModule({
  declarations: [FilterPipe],
  exports: [FilterPipe],
})
export class SharedModule {}
