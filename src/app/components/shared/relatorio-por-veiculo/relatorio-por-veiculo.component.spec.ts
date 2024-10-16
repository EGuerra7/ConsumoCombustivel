import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPorVeiculoComponent } from './relatorio-por-veiculo.component';

describe('RelatorioPorVeiculoComponent', () => {
  let component: RelatorioPorVeiculoComponent;
  let fixture: ComponentFixture<RelatorioPorVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioPorVeiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPorVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
