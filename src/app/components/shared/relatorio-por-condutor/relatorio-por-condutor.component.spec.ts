import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPorCondutorComponent } from './relatorio-por-condutor.component';

describe('RelatorioPorCondutorComponent', () => {
  let component: RelatorioPorCondutorComponent;
  let fixture: ComponentFixture<RelatorioPorCondutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioPorCondutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPorCondutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
