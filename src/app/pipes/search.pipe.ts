import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
        transform(items: any[], searchText: string, attr: string): any[] {
                if (!items) return [];
                if (!searchText) return items;

                searchText = searchText.toLowerCase();
                return items.filter(item => {
                        if (item[attr])
                                return item[attr].toString().toLowerCase().includes(searchText);
                        else return false;
                });
        }
}