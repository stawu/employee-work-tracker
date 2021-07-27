import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent implements OnInit {

  @Output() toggleToolbarEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleToolbar(){
    this.toggleToolbarEvent.emit();
  }

}
