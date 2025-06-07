import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemProdutosComponent } from './listagem-produtos.component';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { of } from 'rxjs';

describe('ListagemProdutosComponent', () => {
  let component: ListagemProdutosComponent;
  let fixture: ComponentFixture<ListagemProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListagemProdutosComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ termoBusca: 'mouse' })
          }
        },
        {
          provide: ProdutoService,
          useValue: {
            buscarPorTermo: (termo: string) =>
              of([
                {
                  nome: 'Mouse Gamer',
                  preco: 99.9,
                  descricao: 'Mouse com RGB',
                  imagem: 'img.jpg'
                }
              ])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar produtos com o termo "mouse"', () => {
    expect(component.produtos.length).toBeGreaterThan(0);
    expect(component.produtos[0].nome).toContain('Mouse');
  });

  it('deve definir o termo de busca corretamente', () => {
    expect(component.termoBusca).toBe('mouse');
  });
});
