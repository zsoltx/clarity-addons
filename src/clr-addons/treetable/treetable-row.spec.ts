/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrTreetableModule, ClrTreetableRow } from '@porscheinformatik/clr-addons';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row [clrExpandable]="true">
        <clr-tt-cell></clr-tt-cell>

        <clr-tt-row>
          <clr-tt-cell></clr-tt-cell>
        </clr-tt-row>
      </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class RowClickableTestComponent {
  @ViewChild(ClrTreetableRow, { static: true }) ttRow: ClrTreetableRow;
}

@Component({
  template: `
    <clr-treetable>
      <clr-tt-row> </clr-tt-row>
    </clr-treetable>
  `,
  standalone: false,
})
class EmptyTestComponent {
  @ViewChild(ClrTreetableRow, { static: true }) ttRow: ClrTreetableRow;
}

describe('ClrTreetableRow', () => {
  let emptyTestComponent: EmptyTestComponent;
  let rowClickableTestComponent: RowClickableTestComponent;

  let rowClickableTestComponentFixture: ComponentFixture<RowClickableTestComponent>;
  let emptyTestComponentFixture: ComponentFixture<EmptyTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyTestComponent, RowClickableTestComponent],
      imports: [ClarityModule, FormsModule, ClrTreetableModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    rowClickableTestComponentFixture = TestBed.createComponent(RowClickableTestComponent);
    rowClickableTestComponent = rowClickableTestComponentFixture.componentInstance;
    rowClickableTestComponentFixture.detectChanges();

    emptyTestComponentFixture = TestBed.createComponent(EmptyTestComponent);
    emptyTestComponent = emptyTestComponentFixture.componentInstance;
    emptyTestComponentFixture.detectChanges();
  }));

  it('should create', () => {
    expect(emptyTestComponent).toBeTruthy();
  });

  it('should expand if clicked', () => {
    expect(rowClickableTestComponent.ttRow.expanded).toBeFalsy();
    const row = rowClickableTestComponentFixture.debugElement.query(By.css('.treetable-row:first-of-type'));
    row.triggerEventHandler('click', { target: row.nativeElement });
    rowClickableTestComponentFixture.detectChanges();
    expect(rowClickableTestComponent.ttRow.expanded).toBeTruthy();
  });
});
