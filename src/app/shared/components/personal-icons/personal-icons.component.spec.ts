import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIconsComponent } from './personal-icons.component';

describe('PersonalIconsComponent', () => {
  let component: PersonalIconsComponent;
  let fixture: ComponentFixture<PersonalIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
