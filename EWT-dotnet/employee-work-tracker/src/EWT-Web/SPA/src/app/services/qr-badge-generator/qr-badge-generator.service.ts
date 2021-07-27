import { ComponentFactoryResolver, Injectable, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import html2canvas from 'html2canvas';
import { QrBadgeComponent } from 'src/app/employees-page/qr-badge/qr-badge.component';
import { EmployeeObject } from '../employees-data/employees-data.interface.service';

@Injectable({
  providedIn: 'root'
})
export class QrBadgeGeneratorService {

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, private cfResolver: ComponentFactoryResolver) {
      this.renderer = rendererFactory.createRenderer(null, null);
  }

  async generateQrBadgesAsync(employees: EmployeeObject[]): Promise<void> {

    const qrBadgesContainer = this.renderer.createElement('div');
    this.renderer.setProperty(qrBadgesContainer, 'id', '---qr-badges-container')
    this.renderer.appendChild(document.body, qrBadgesContainer);

    const qrBadgeComponent = this.renderer.createElement('app-qr-badge');
    this.renderer.setProperty(qrBadgesContainer, 'employee', employees[0]);
    this.renderer.appendChild(qrBadgesContainer, qrBadgeComponent);
    //document.createElement()
    //const qrBagesCanvas = await html2canvas();
  }
}
