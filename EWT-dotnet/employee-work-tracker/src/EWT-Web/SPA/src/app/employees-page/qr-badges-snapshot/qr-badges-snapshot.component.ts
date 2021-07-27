import { AfterViewInit, Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmployeeObject } from 'src/app/services/employees-data/employees-data.interface.service';

@Component({
  selector: 'app-qr-badges-snapshot',
  templateUrl: './qr-badges-snapshot.component.html',
  styleUrls: ['./qr-badges-snapshot.component.css']
})
export class QrBadgesSnapshotComponent {

  employeesToRender: EmployeeObject[] = [];

  constructor() { }

  generateSnapshotAndSaveAsPdf(employees: EmployeeObject[]) {
    this.employeesToRender = employees;

    const intervalHandler = setInterval(async () => {
      const snapshotElement = document.getElementById('qr-badges-snapshot');
      if(snapshotElement !== null){
        clearInterval(intervalHandler);
        const qrBadgesCanvas = await html2canvas(snapshotElement,  {
          scale: 1, 
        });

        this.employeesToRender = [];

        const doc = new jsPDF('p', 'px');
        const imgData = qrBadgesCanvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 10, 10, qrBadgesCanvas.width, qrBadgesCanvas.height);
        doc.save("qr.pdf");
      }
    }, 50);
  }
}
