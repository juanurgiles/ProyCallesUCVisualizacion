import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaCallesComponent } from './mapa-calles.component';

describe('MapaCallesComponent', () => {
  let component: MapaCallesComponent;
  let fixture: ComponentFixture<MapaCallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaCallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaCallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
