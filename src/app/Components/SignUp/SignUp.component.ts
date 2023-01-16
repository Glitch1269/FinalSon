import { switchMap } from 'rxjs';
import { FbservisService } from 'src/app/services/fbservis.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    public fbServis: FbservisService,
    public htoast: HotToastService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  UyeOl(displayName: string, mail: string, parola: string,admin: string,id:string,kayTarih: string) {
    this.fbServis.
      KayitOl(mail, parola)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.fbServis.UyeEkle({
            uid, mail, displayName: displayName,
            kayTarih: '',
            admin : 1 || 0,
            tamam: false
          })
        ),
        this.htoast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

}
