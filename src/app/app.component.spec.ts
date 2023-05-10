import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA 
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the drawer', () => {
    const drawer: any = jasmine.createSpyObj('drawer', ['toggle']);
    spyOn(document, 'querySelector').and.returnValue(drawer);

    component.toggleDrawer();

    expect(document.querySelector).toHaveBeenCalledWith('mat-drawer');
    expect(drawer.toggle).toHaveBeenCalled();
  });

  it('should receive tables', () => {
    const tables: any = ['table1', 'table2'];
    component.receiveTables(tables);

    expect(component.dataTables).toEqual(tables);
  });

  it('should generate a text file', () => {

    const table1 = { name: 'Table1', columns: [{ name: 'Column1', type: 'string', isUnique: true }] };
    const table2 = { name: 'Table2', columns: [{ name: 'Column2', type: 'number', isUnique: false }] };
    component.dataTables = [table1, table2];    
    component.generateTxtFile();

    
  });
});
