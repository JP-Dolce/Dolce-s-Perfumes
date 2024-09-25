import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeEditComponent } from './perfume-edit.component';

describe('PerfumeEditComponent', () => {
  let component: PerfumeEditComponent;
  let fixture: ComponentFixture<PerfumeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfumeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
