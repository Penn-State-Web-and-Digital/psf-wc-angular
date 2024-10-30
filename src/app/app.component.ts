import { Component, OnInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FederatedDataService } from './federated-data.service';
import { serializeObjects } from './utility';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FederatedDataService],
})
export class AppComponent implements OnInit {
  title = 'my-angular-app';

  constructor(
    private federatedDataService: FederatedDataService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.federatedDataService.fetchFederatedData().subscribe((data) => {
      const { brandFooter, brandBar, header, footer } = data;

      // Serialize the data
      const [
        serializedBrandFooter,
        serializedBrandBar,
        serializedHeader,
        serializedFooter,
      ] = serializeObjects(
        brandFooter.linkContentCollection.items,
        brandBar,
        header,
        footer
      );

      // Map the data to element selectors
      const elementDataMap = {
        'psf-brand-footer': serializedBrandFooter,
        'psf-brand-bar': serializedBrandBar,
        'psf-header': serializedHeader,
        'psf-footer': serializedFooter,
      };

      // Use a helper function to set attributes
      this.setElementDataAttributes(elementDataMap);
    });
  }

  private setElementDataAttributes(dataMap: { [selector: string]: string }) {
    Object.keys(dataMap).forEach((selector) => {
      const element = this.el.nativeElement.querySelector(selector);
      if (element) {
        element.setAttribute('data', dataMap[selector]);
      }
    });
  }
}
