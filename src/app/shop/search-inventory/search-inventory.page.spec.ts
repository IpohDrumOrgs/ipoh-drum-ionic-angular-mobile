import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInventoryPage } from './search-inventory.page';

describe('SearchInventoryPage', () => {
  let component: SearchInventoryPage;
  let fixture: ComponentFixture<SearchInventoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInventoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInventoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
