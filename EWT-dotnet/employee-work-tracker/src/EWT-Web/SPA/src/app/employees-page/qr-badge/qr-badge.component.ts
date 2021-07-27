import { Component, Input, OnInit } from '@angular/core';
import { EmployeeObject } from 'src/app/services/employees-data/employees-data.interface.service';

@Component({
  selector: 'app-qr-badge[employee]',
  templateUrl: './qr-badge.component.html',
  styleUrls: ['./qr-badge.component.css']
})
export class QrBadgeComponent {

  @Input() employee: EmployeeObject = new EmployeeObject("", "", "");

}
