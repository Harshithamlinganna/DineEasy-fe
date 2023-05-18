import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import IMenuModelAngular from '../interfaces/IMenuModelAngular';
import { MenuService } from '../service/menu.service';
import { Observable, of} from 'rxjs';
import IMenuItemsModelAngular from '../interfaces/IMenuItemsModelAngular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuService]
})

export class MenuComponent implements OnInit {
  menu: Observable<IMenuModelAngular[]>;
  constructor(private menuService$: MenuService, private route: ActivatedRoute, private router: Router) 
  { 
    const resId = route.snapshot.params['resId'];
    this.menuService$.getMenu(resId).subscribe((data: IMenuModelAngular[]) => {
      this.menu = of(data);
    });
  }

  selectMenu(menu: IMenuModelAngular) {
    this.router.navigate(['/restaurants', menu.resId, 'menu', menu.menuId, 'items']);
  }

  ngOnInit():void { }
    
}
