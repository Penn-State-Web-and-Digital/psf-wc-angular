import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FederatedDataService } from './federated-data.service';

type PsuChromeElement = HTMLElement & { props?: unknown };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './app.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [FederatedDataService],
})
export class AppComponent implements AfterViewInit {
  title = 'my-angular-app';

  @ViewChild('brandBar') brandBar?: ElementRef<PsuChromeElement>;
  @ViewChild('header') header?: ElementRef<PsuChromeElement>;
  @ViewChild('footer') footer?: ElementRef<PsuChromeElement>;
  @ViewChild('brandFooter') brandFooter?: ElementRef<PsuChromeElement>;

  constructor(private federatedDataService: FederatedDataService) {}

  ngAfterViewInit() {
    this.federatedDataService.fetchFederatedData().subscribe((data) => {
      if (this.brandBar?.nativeElement) {
        this.brandBar.nativeElement.props = {
          ...data.brandBar,
          isExternal: true,
        };
      }
      if (this.header?.nativeElement) {
        this.header.nativeElement.props = data.header;
      }
      if (this.footer?.nativeElement) {
        this.footer.nativeElement.props = data.footer;
      }
      if (this.brandFooter?.nativeElement) {
        this.brandFooter.nativeElement.props = data.brandFooter;
      }
    });
  }
}
