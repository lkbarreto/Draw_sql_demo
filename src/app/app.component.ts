import { Component } from '@angular/core';
import { Table } from './interfaces/tables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFiller = false;
  dataTables : Table | any;

  toggleDrawer() {
    const drawer: any = document.querySelector('mat-drawer');
    drawer.toggle();
  }

  receiveTables($event: any) {  
    this.dataTables = $event;
  }


  generateTxtFile() {
    let txtContent = '';
  
    this.dataTables.forEach((table: { id: any; columns: any[]; }) => {
      txtContent += `model ${table.id} {\n`;
  
      table.columns.forEach((column: { id: any; type: any; isUnique: any; }) => {
        txtContent += `  ${column.id} ${column.type} ${column.isUnique ? '@unique' : ''}\n`;
      });
      txtContent += '}\n\n';
    });
  
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent));
    element.setAttribute('download', 'data.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
