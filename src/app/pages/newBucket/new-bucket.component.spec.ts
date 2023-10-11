import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBucketComponent } from './new-bucket.component';

describe('NewListComponent', () => {
  let component: NewBucketComponent;
  let fixture: ComponentFixture<NewBucketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBucketComponent]
    });
    fixture = TestBed.createComponent(NewBucketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
