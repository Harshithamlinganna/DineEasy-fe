import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import IRestaurantModelAngular from '../interfaces/IRestaurantModelAngular';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent {
  restaurant: IRestaurantModelAngular;

  constructor(
    private route: ActivatedRoute,
    private service: RestaurantService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log("id ", id);
    this.service.getRestaurantDetailsById(id).subscribe(
      data => {
        this.restaurant = data
        console.log("restaurant", this.restaurant.name)
      }
    );
  }

}
