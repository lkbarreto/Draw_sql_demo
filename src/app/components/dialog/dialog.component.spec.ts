import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule, ControlValueAccessor } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DialogComponent } from './dialog.component';
import { Data } from 'src/app/interfaces/dataDialog';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';


describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRef: MatDialogRef<DialogComponent>;

  

  class MatSelectStubComponent implements ControlValueAccessor {
    writeValue(obj: any) {}
    registerOnChange(fn: any) {}
    registerOnTouched(fn: any) {}
    setDisabledState(isDisabled: boolean) {}
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent, MatSelectStubComponent],
      imports: [
        ReactiveFormsModule, 
        HttpClientTestingModule,
        MatFormFieldModule, 
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MockModule(MatFormFieldModule),
        MockModule(MatInputModule),
        BrowserAnimationsModule,
        FormsModule
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {
          close: () => {},
        } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { data: { name: 'Test Name', type: 'Test Type', isUnique: true } } // Mock the MAT_DIALOG_DATA
        },
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: MatSelectStubComponent,
          multi: true,
        }
      ], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should initialize form group with data from MAT_DIALOG_DATA', () => {
    const formBuilder: FormBuilder = TestBed.inject(FormBuilder);
    const data: Data = TestBed.inject(MAT_DIALOG_DATA);

    component.ngOnInit();

  
  });


  it('should call onNoClick', () => {
    spyOn(dialogRef, 'close');
    component.onNoClick();
  });
});
