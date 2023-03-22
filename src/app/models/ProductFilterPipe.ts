import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return (
        item.product_name.toLowerCase().includes(searchText)
        //  ||
        // item.product_desc.toLowerCase().includes(searchText) ||
        // item.product_price.toString().toLowerCase().includes(searchText)
      );
    });
  }
}
