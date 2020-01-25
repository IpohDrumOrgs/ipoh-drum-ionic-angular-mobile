import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySelectedMyVideoModalPage } from './play-selected-my-video-modal.page';

describe('PlaySelectedMyVideoModalPage', () => {
  let component: PlaySelectedMyVideoModalPage;
  let fixture: ComponentFixture<PlaySelectedMyVideoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaySelectedMyVideoModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySelectedMyVideoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
