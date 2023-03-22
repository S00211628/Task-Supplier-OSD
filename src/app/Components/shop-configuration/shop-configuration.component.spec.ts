import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopConfigurationComponent } from './shop-configuration.component';

describe('ShopConfigurationComponent', () => {
  let component: ShopConfigurationComponent;
  let fixture: ComponentFixture<ShopConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
