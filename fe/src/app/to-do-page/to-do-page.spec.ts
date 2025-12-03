import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoPage } from './to-do-page';

describe('ToDoPage', () => {
  let component: ToDoPage;
  let fixture: ComponentFixture<ToDoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
