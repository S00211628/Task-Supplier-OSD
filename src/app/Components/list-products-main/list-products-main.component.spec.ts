import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductsMainComponent } from './list-products-main.component';

describe('ListProductsMainComponent', () => {
  let component: ListProductsMainComponent;
  let fixture: ComponentFixture<ListProductsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProductsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
