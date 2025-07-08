import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeusPedidosComponent } from './seus-pedidos.component';

describe('SeusPedidosComponent', () => {
  let component: SeusPedidosComponent;
  let fixture: ComponentFixture<SeusPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeusPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeusPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
