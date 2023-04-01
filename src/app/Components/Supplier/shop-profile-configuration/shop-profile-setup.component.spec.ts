import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProfileSetupComponent } from './shop-profile-setup.component';

describe('ShopProfileSetupComponent', () => {
  let component: ShopProfileSetupComponent;
  let fixture: ComponentFixture<ShopProfileSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopProfileSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProfileSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
