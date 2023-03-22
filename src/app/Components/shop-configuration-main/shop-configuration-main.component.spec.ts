import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopConfigurationMainComponent } from './shop-configuration-main.component';

describe('ShopConfigurationMainComponent', () => {
  let component: ShopConfigurationMainComponent;
  let fixture: ComponentFixture<ShopConfigurationMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopConfigurationMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopConfigurationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
