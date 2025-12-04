import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoUpDelForm } from './to-do-up-del-form';

describe('ToDoUpDelForm', () => {
  let component: ToDoUpDelForm;
  let fixture: ComponentFixture<ToDoUpDelForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoUpDelForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoUpDelForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
