import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Page } from '@app/models/pages/page';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private route: ActivatedRoute) { }

  /**
 * Navigate to a especific url inside the application, from the route reference.
 * @param path Page url reference.
 * @param route Relative hierarchical route from component that calls this method.
 */
  public goto(path: string, route: ActivatedRoute = this.route, param?: any): void {
    if (param)
      path = path.concat('/' + param);
    this.router.navigate([path], { relativeTo: route, skipLocationChange: false })
  }

  /**
 * Filter Pages collection to match url attribute with the path parameter.
 * @param path Page url reference.
 */
  private filterPath(path: string, pages: Page[]): Page {
    return pages.filter(page => page.url === path)[0]
  }

  public toPagesArray(pages: any): Array<any> {
    let ret: Array<Page> = [];
    Object.keys(pages).map(key => {
      ret.push(pages[key]);
    });
    return ret;
  }
}
