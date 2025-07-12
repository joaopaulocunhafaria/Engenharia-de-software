import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueProdutoComponent } from './estoque-produto.component';

describe('EstoqueProdutoComponent', () => {
  let component: EstoqueProdutoComponent;
  let fixture: ComponentFixture<EstoqueProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoqueProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
