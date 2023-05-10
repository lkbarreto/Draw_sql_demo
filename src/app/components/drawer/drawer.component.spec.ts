import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Column } from 'src/app/interfaces/column';
import { Table } from 'src/app/interfaces/tables';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';


import { MockModule } from 'ng-mocks';

import { DialogComponent } from '../dialog/dialog.component';
import { DrawerComponent } from './drawer.component';

import { TablesService } from 'src/app/services/tables.service';
import { of } from 'rxjs';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;
  let dialog: MatDialog;
  let service: TablesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatCheckboxModule,
        MockModule(MatFormFieldModule),
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule],
      declarations: [DrawerComponent, DialogComponent],
      providers: [
        FormBuilder,
        {
          provide: MatDialog,
          useValue: {
            open: () => { },
          }
        },
        {
          provide: MatDialogRef,
          useValue:{
            afterClosed: ()=>{ }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    service= TestBed.inject(TablesService)
    spyOn(service, 'getTables').and.returnValue(of([]));
    spyOn(service, 'UpdateTable').and.returnValue(of([]));
    spyOn(service, 'postTables').and.returnValue(of([]));
    spyOn(service, 'deleteTable').and.returnValue(of([]))



    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    const formBuilder: FormBuilder = TestBed.inject(FormBuilder);
    component.ngOnInit();

    const expectedFormGroup = formBuilder.group({
      tableName: ['', Validators.required],
      columnName: ['', Validators.required],
      dataType: ['', Validators.required],
      isUnique: new FormControl(false)
    });

  });

  it('should add column to columns array when addColumn method is called with valid form', () => {
    const columnName = 'Test Column';
    const dataType = 'Text';
    const isUnique = false;

    component.form.get('columnName').setValue(columnName);
    component.form.get('dataType').setValue(dataType);
    component.form.get('isUnique').setValue(isUnique);

    component.addColumn();

    const expectedColumn: Column = {
      id: columnName,
      type: dataType,
      isUnique: isUnique
    };

    expect(component.columns.length).toBe(1);
    expect(component.columns[0]).toEqual(expectedColumn);
    expect(component.form.get('columnName').value).toBe('');
    expect(component.form.get('dataType').value).toBeNull();
    expect(component.form.get('isUnique').value).toBe(false);
  });

  


  it('should call deleteColumnSaved', () => {

    const expectedColumn: Column = {
      id: "columnName",
      type: "dataType",
      isUnique: false
    };
     component.columns=[expectedColumn]

    component.tables= [{
      id: "tableName",
      columns: [expectedColumn]
    }]

    component.deleteColumnSaved(0, 0);
    component.deleteColumn(0);
    component.deleteTable("test");
  })

  // Resto de pruebas unitarias...
});


