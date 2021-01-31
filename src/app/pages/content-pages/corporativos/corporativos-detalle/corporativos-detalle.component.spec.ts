import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporativosDetalleComponent } from './corporativos-detalle.component';

describe('CorporativosDetalleComponent', () => {
  let component: CorporativosDetalleComponent;
  let fixture: ComponentFixture<CorporativosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporativosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporativosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
