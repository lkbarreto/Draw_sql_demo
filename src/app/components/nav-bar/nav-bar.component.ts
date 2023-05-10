import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() drawerClick = new EventEmitter();
  @Output() downloadClick= new EventEmitter();

  onButtonClick() {
    this.drawerClick.emit();
  }

  onDownload(){
    this.downloadClick.emit();
  }
}
