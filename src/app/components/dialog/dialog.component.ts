import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Data } from 'src/app/interfaces/dataDialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  formGroup: FormGroup | any;


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(){
    this.formGroup= new FormGroup({
      name: new FormControl(),
      type: new FormControl(),
      isUnique: new FormControl()

    })
    this.formGroup = this.formBuilder.group({
      name: [ this.data.data.id, Validators.required],
      type: [this.data.data.type, Validators.required],
      isUnique: [this.data.data.isUnique]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
