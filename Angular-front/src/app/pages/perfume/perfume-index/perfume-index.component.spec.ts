import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfumeIndexComponent } from './perfume-index.component';

describe('PerfumeIndexComponent', () => {
  let component: PerfumeIndexComponent;
  let fixture: ComponentFixture<PerfumeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfumeIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfumeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
