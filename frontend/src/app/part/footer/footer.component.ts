import { Component } from '@angular/core';
import app from './../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  appversion: string =  app.version;
}
