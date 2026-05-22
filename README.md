## Getting Started

```bash
yarn
yarn start
```

Requires `@psu-flex/core-ui-federated-wc` (chrome-elements ≥ 0.0.5 with `props` setters and footer mapper fixes).

## Usage

Register elements once in `main.ts`:

```typescript
import { defineAllPsuElements } from '@psu-flex/core-ui-federated-wc';

defineAllPsuElements();
```

Link styles in `angular.json`:

```json
"styles": ["node_modules/@psu-flex/wc-styles/dist/psf-styles.css"]
```

Fetch from the federated endpoint and pass each raw API slice to the matching element. No mapping in the app — CEs transform Contentful shape internally.

### Vanilla JS

```javascript
fetch('https://psu-flex-endpoints.vercel.app/api/fetchAllFederatedData')
  .then((r) => r.json())
  .then((data) => {
    document.querySelector('psu-brand-bar').props = data.brandBar;
    document.querySelector('psu-mega-menu-header').props = data.header;
    document.querySelector('psu-site-footer').props = data.footer;
    document.querySelector('psu-brand-footer').props = data.brandFooter;
  });
```

### Angular

`[props]` on native custom elements often sets an HTML attribute, not `element.props`, so the CE setter never runs. Set the property in TypeScript after fetch:

```html
<psu-brand-bar #brandBar></psu-brand-bar>
<psu-mega-menu-header #header></psu-mega-menu-header>
<psu-site-footer #footer></psu-site-footer>
<psu-brand-footer #brandFooter></psu-brand-footer>
```

```typescript
@ViewChild('brandBar') brandBar?: ElementRef<HTMLElement & { props?: unknown }>;

ngAfterViewInit() {
  this.federatedDataService.fetchFederatedData().subscribe((data) => {
    if (this.brandBar?.nativeElement) {
      this.brandBar.nativeElement.props = data.brandBar;
    }
    // header, footer, brandFooter — same pattern
  });
}
```

Add `CUSTOM_ELEMENTS_SCHEMA` on the component and `provideHttpClient()` in `app.config.ts`.

Alternatives: `[attr.data]="data | json"` if the CE supports `attributeChangedCallback`, or a small directive that assigns `nativeElement.props` in `ngOnChanges`.
