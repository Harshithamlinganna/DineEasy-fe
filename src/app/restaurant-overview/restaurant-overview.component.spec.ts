import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOverviewComponent } from './restaurant-overview.component';

describe('RestaurantOverviewComponent', () => {
  let component: RestaurantOverviewComponent;
  let fixture: ComponentFixture<RestaurantOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantOverviewComponent]
    });
    fixture = TestBed.createComponent(RestaurantOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
