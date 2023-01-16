import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FbservisService } from './services/fbservis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  uye = this.servis.AktifUyeBilgi;

  constructor(
    public servis: FbservisService,
    public router: Router
  ) {

  }

  OturumKapat() {
    this.servis.OturumKapat().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
  
}
