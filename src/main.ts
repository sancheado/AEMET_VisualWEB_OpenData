import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Your AppModule path
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
ClarityIcons.addIcons(userIcon);