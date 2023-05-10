import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';
import { Column } from 'src/app/interfaces/column';
import { Table } from 'src/app/interfaces/tables';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {

  @Output() dataTable = new EventEmitter<any>();
  dataTypes = [
    "Text",
    "Number",
    "Boolean"
  ]
  isExpanded = true;
  form: FormGroup | any;
  columns: Column[] = [];
  tables: Table[] = [];
  dialogRef: MatDialogRef<DialogComponent, any> | undefined

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private tableService: TablesService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      tableName: ['', Validators.required],
      columnName: ['', Validators.required],
      dataType: ['', Validators.required],
      isUnique: new FormControl(false)
    });

    this.getTables();
  }

  getTables() {
    this.tableService.getTables().subscribe(data => {
      this.tables = data;
      this.dataTable.emit(data);
    })
  }

  updateTables(id: string, item: any) {
    this.tableService.UpdateTable(id, item).subscribe(data => {
      this.getTables();
    })
  }


  addColumn() {

    if (this.form.get('columnName').valid && this.form.get('dataType').valid) {
      const newColumn: Column = {
        id: this.form.value.columnName,
        type: this.form.value.dataType,
        isUnique: this.form.value.isUnique
      };
      this.columns.push(newColumn);
      this.form.get('columnName').setValue('');
      this.form.get('dataType').setValue(null);
      this.form.get('isUnique').setValue(false);
    }
  }

  addTable() {

    if (this.form.get('tableName').valid) {
      const newTable: Table = {
        id: this.form.value.tableName,
        columns: this.columns
      }

      this.tableService.postTables(newTable).subscribe(data => {
        this.form.get('tableName').setValue('');
        this.form.get('columnName').setValue('');
        this.form.get('dataType').setValue(null);
        this.form.get('isUnique').setValue(false);
        this.columns = [];
        this.getTables();
      })
    }
  }

  editColumn(item: Column, index: number): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      data: { type: "column", data: item, dataTypes: this.dataTypes },
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.columns[index] = result;
      }
    });
  }

  deleteColumn(index: number) {
    this.columns.splice(index, 1);
  }

  editColumnSaved(item: Column, index: number, indexTable: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { type: "column", data: item, dataTypes: this.dataTypes },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const itemEdited = {
          id: result.name,
          type: result.type,
          isUnique: result.isUnique,
        }
        this.tables[indexTable].columns[index] = itemEdited;
        this.updateTables("test1", this.tables[indexTable]);
      }
    });
  }

  deleteColumnSaved(index: number, indexTable: number) {
    this.tables[indexTable].columns.splice(index, 1);
  }

  deleteTable(id:string) {
    this.tableService.deleteTable(id).subscribe(data => {
      this.getTables();
    })    
  }




}
