import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoBuscaComponent } from './resultado-busca.component';

describe('ResultadoBuscaComponent', () => {
  let component: ResultadoBuscaComponent;
  let fixture: ComponentFixture<ResultadoBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoBuscaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultadoBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
